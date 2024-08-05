
from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User
from .models import FriendRequest, UserProfileInfo

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
        response = self.client.get(reverse('get_friends_list'))
        self.assertEqual(response.status_code, 200)
        self.assertIn('user2', response.json())

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
