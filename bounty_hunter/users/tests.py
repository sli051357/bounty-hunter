
from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User
from .models import FriendRequest, UserProfileInfo

class DisplayNameTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.user1 = User.objects.create_user(username='user1', password='password')
        self.profile1 = UserProfileInfo.objects.create(owner=self.user1, display_name="User One")
        self.client.login(username='user1', password='password')

    def test_display_name(self):
        # Test display name retrieval
        response = self.client.get(reverse('display_name', args=[self.user1.username]))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"display_name": "User One"})

    def test_display_name_default(self):
        # Test default display name when it is not set
        user2 = User.objects.create_user(username='user2', password='password')
        UserProfileInfo.objects.create(owner=user2)  # No need to assign the result to a variable
    
        response = self.client.get(reverse('display_name', args=[user2.username]))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"display_name": "user2"})  # The display name should default to the username if not set
        
class FriendRequestTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.user1 = User.objects.create_user(username='user1', password='password')
        self.user2 = User.objects.create_user(username='user2', password='password')
        self.user3 = User.objects.create_user(username='user3', password='password')
        self.profile1 = UserProfileInfo.objects.create(owner=self.user1)
        self.profile2 = UserProfileInfo.objects.create(owner=self.user2)
        self.profile3 = UserProfileInfo.objects.create(owner=self.user3)
        self.client.login(username='user1', password='password')

    def test_get_incoming_friend_requests(self):
        FriendRequest.objects.create(from_user=self.user2, to_user=self.user1)
        response = self.client.get(reverse('get_incoming_friend_requests'))
        self.assertEqual(response.status_code, 200)
        self.assertIn('from_user', response.json()['1'])
        self.assertIn('to_user', response.json()['1'])

    def test_get_friends_list(self):
        self.profile1.friends.add(self.user2)
        self.profile1.friends.add(self.user3)
        response = self.client.get(reverse('get_friends_list'))
        expected = {
            "friend 1": {
                "username": "user2", 
                "id": 2, 
                "rating": 0, 
                "image url": 'http://testserver/users/res/users/res/default_pfp.png'
                },
            "friend 2": {
                "username": "user3", 
                "id": 3, 
                "rating": 0, 
                "image url": 'http://testserver/users/res/users/res/default_pfp.png'
            }
        }
        #print(response.json())
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), expected)

    def test_get_friend_count(self):
        # empty friend list
        response = self.client.get(reverse('get_friend_count'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), 0)

        # add friend
        self.profile1.friends.add(self.user2)
        self.profile1.friends.add(self.user3)
        response = self.client.get(reverse('get_friend_count'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), 2)

        # remove friend
        self.profile1.friends.remove(self.user2)
        response=self.client.get(reverse('get_friend_count'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), 1)

    def test_send_friend_request(self):
        response = self.client.post(reverse('send_friend_request', args=['user2']))
        self.assertEqual(response.status_code, 200)
        self.assertEqual("success",response.json()['status'])

        response = self.client.post(reverse('send_friend_request', args=['user2']))
        self.assertEqual(response.status_code, 200)
        self.assertEqual("fail",response.json()['status'])

    def test_accept_friend_request(self):
        friend_request = FriendRequest.objects.create(from_user=self.user2, to_user=self.user1)
        response = self.client.post(reverse('accept_friend_request', args=[friend_request.pk]))
        self.assertEqual(response.status_code, 200)
        self.assertEqual("success",response.json()['status'])
        self.assertIn(self.user2, self.profile1.friends.all())
        self.assertIn(self.user1, self.profile2.friends.all())
        self.assertFalse(FriendRequest.objects.filter(pk=friend_request.pk).exists())
        
    def test_reject_friend_request(self):
        friend_request = FriendRequest.objects.create(from_user=self.user2, to_user=self.user1)
        response = self.client.post(reverse('reject_friend_request', args=[friend_request.pk]))
        self.assertEqual(response.status_code, 200)
        self.assertEqual("success",response.json()['status'])
        self.assertNotIn(self.user2, self.profile1.friends.all())
        self.assertNotIn(self.user1, self.profile2.friends.all())
        self.assertFalse(FriendRequest.objects.filter(pk=friend_request.pk).exists())

class RemoveFriendTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.user1 = User.objects.create_user(username='user1', password='password')
        self.user2 = User.objects.create_user(username='user2', password='password')
        self.user3 = User.objects.create_user(username='user3', password='password')
        self.profile1 = UserProfileInfo.objects.create(owner=self.user1)
        self.profile2 = UserProfileInfo.objects.create(owner=self.user2)
        self.profile3 = UserProfileInfo.objects.create(owner=self.user3)
        self.client.login(username='user1', password='password')

    def test_remove_friend_success(self):
        self.profile1.friends.add(self.user2)
        self.profile1.friends.add(self.user3)
        # print(self.profile1.friends.all())
        response = self.client.post(reverse('remove_friend', args=[self.user2.username]))
        self.profile1.refresh_from_db()
        # print(self.profile1.friends.all())
        self.assertEqual(response.status_code, 200)
        self.assertEqual("success",response.json()['status'])
        self.assertNotIn(self.user2, self.profile1.friends.all())

    def test_remove_fake_friend(self):
        self.profile1.friends.add(self.user2)
        # print(self.profile1.friends.all())
        response = self.client.post(reverse('remove_friend', args=[self.user3.username]))
        self.profile1.refresh_from_db()
        self.assertEqual(response.status_code, 200)
        self.assertEqual("fail",response.json()['status'])
        