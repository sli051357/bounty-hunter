import decimal
from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User
from .models import Favor, Tag
from .views import INCOMPLETE, CANCEL, DELETE, CREATE, COMPLETE
import datetime

class ChangeStatusTestCase(TestCase):
    
    def setUp(self):
        self.client = Client()
        self.user_owner = User.objects.create_user(username='owner', password='passwofdsfdsrd321!!!')
        self.user_assignee = User.objects.create_user(username='assignee', password='passwofdsfrd321!!!')

        self.favor = Favor.objects.create(
            owner=self.user_owner, 
            assignee=self.user_assignee,
            owner_status=CREATE, 
            assignee_status=INCOMPLETE
        )

        self.favor2 = Favor.objects.create(
            owner=self.user_owner, 
            assignee=self.user_assignee,
            owner_status=INCOMPLETE, 
            assignee_status=INCOMPLETE
        )

    def test_valid_transition_owner(self):
        self.client.login(username='owner', password='passwofdsfdsrd321!!!')
        response = self.client.post(reverse('change_status', args=[self.favor.id]), {'status': CANCEL})
        self.favor.refresh_from_db()
        self.assertEqual(response.json()['success'], True)
        self.assertEqual(self.favor.owner_status, DELETE)
        self.assertEqual(self.favor.assignee_status, DELETE)
        self.assertEqual(self.favor.active, False)
        self.assertEqual(self.favor.completed, False)


    def test_valid_transition_assignee(self):
        self.client.login(username='assignee', password='passwofdsfrd321!!!')
        response = self.client.post(reverse('change_status', args=[self.favor.id]), {'status': CREATE})
        self.favor.refresh_from_db()
        self.assertEqual(response.json()['success'], True)
        self.assertEqual(self.favor.owner_status, INCOMPLETE)
        self.assertEqual(self.favor.assignee_status, INCOMPLETE)
        self.assertEqual(self.favor.active, True)
        self.assertEqual(self.favor.completed, False)


    def test_invalid_transition_owner(self):
        self.client.login(username='owner', password='passwofdsfdsrd321!!!')
        response = self.client.post(reverse('change_status', args=[self.favor.id]), {'status': CREATE})
        self.favor.refresh_from_db()
        self.assertEqual(response.json()['success'], False)
        self.assertEqual(self.favor.owner_status, CREATE)
        self.assertEqual(self.favor.assignee_status, INCOMPLETE)

    def test_invalid_transition_assignee(self):
        self.client.login(username='assignee', password='passwofdsfrd321!!!')
        response = self.client.post(reverse('change_status', args=[self.favor.id]), {'status': DELETE})
        self.favor.refresh_from_db()
        self.assertEqual(response.json()['success'], False)
        self.assertEqual(self.favor.owner_status, CREATE)
        self.assertEqual(self.favor.assignee_status, INCOMPLETE)

class FavorListTestCase(TestCase):

    def setUp(self):
        self.client = Client()
        self.user_owner = User.objects.create_user(username='user1', password='password123?')
        self.user_assignee1 = User.objects.create_user(username='assignee1', password='password123?')
        self.user_assignee2 = User.objects.create_user(username='assignee2', password='password456?')

        self.tag1 = Tag.objects.create(
            name = "Food",
            color = "#1234ab",
            owner = self.user_owner,
            tag_type = "Preset"
        )

        self.tag2 = Tag.objects.create(
            name = "Travel",
            color = "#5678BC",
            owner = self.user_owner,
            tag_type = "Preset"
        )

        self.tag3 = Tag.objects.create(
            name = "Coffee",
            color = "#3344aa",
            owner = self.user_owner,
            tag_type = "Custom"
        )

        self.favor1 = Favor.objects.create(
            name = "Favor 1",
            owner=self.user_owner, 
            assignee=self.user_assignee1,
            total_owed_type = "Monetary",
            total_owed_amt = '5.25',
            completed = True
        )
        self.favor1.tags.set([self.tag1, self.tag2])

        self.favor2 = Favor.objects.create(
            name = "Second FAVOR",
            owner=self.user_owner, 
            assignee=self.user_assignee2,
            total_owed_type = "Monetary",
            total_owed_amt = '10.00',
            completed = False
        )
        self.favor2.tags.set([self.tag1])

        self.favor3 = Favor.objects.create(
            name = "Fav3",
            owner=self.user_owner, 
            assignee=self.user_assignee1,
            total_owed_type = "Nonmonetary",
            completed = False
        )
        self.favor3.tags.set([self.tag1, self.tag3])

        self.favor4 = Favor.objects.create(
            name = "FOURTH FAVOR",
            owner=self.user_owner, 
            assignee=self.user_assignee2,
            total_owed_type = "Monetary",
            total_owed_amt = '5.50',
            completed = False
        )
        self.favor4.tags.set([self.tag3])
    
    def remove_timestamps(self, favor):
        # Remove timestamps for favor and its tags
        favor.pop('created_at', None)
        favor.pop('updated_at', None)
        for tag in favor['tags']:
            tag.pop('created_at', None)
            tag.pop('updated_at', None)
        return favor

    # test for AND
    def test_and_query(self):
        self.maxDiff = None
        url = reverse('favor_list') + f'?query=and&assignee={self.user_assignee1.id}&tag={self.tag3.id}'
        response = self.client.get(url)
        output = response.json()
        expected_tags = list(self.favor3.tags.all().values())
        expected_f_data = {"name": "Fav3", 
                  "id": self.favor3.id, 
                  "description": self.favor3.description, 
                  "owner": self.favor3.owner.username,
                  "assignee": self.favor3.assignee.username,
                  "created_at": self.favor3.created_at,
                  "updated_at": self.favor3.updated_at,
                  "total_owed_type": self.favor3.total_owed_type,
                  "total_owed_amt": self.favor3.total_owed_amt,
                  "privacy": self.favor3.privacy,
                  "owner_status": self.favor3.owner_status,
                  "assignee_status": self.favor3.assignee_status,
                  "is_active": self.favor3.active, #only show active in frontend
                  "is_completed": self.favor3.completed,
                  "tags": expected_tags,}
        expected = {"favors": [expected_f_data]}
        # print("assignee1 id: ", self.user_assignee1.id)
        # print("tag3 id: ", self.tag3.id)
        # Remove timestamps in output and expected data
        if output['favors']:
            output['favors'][0] = self.remove_timestamps(output['favors'][0])
        expected['favors'][0] = self.remove_timestamps(expected['favors'][0])
        self.assertEqual(output, expected)

    # test for OR
    def test_or_query(self):
        self.maxDiff = None
        url = reverse('favor_list') + f'?query=or&assignee={self.user_assignee1.id}&tag={self.tag3.id}'
        response = self.client.get(url)
        output = response.json()
        expected_f_data = []
        for f in list([self.favor1, self.favor3, self.favor4]):
            expected_tags = list(f.tags.all().values())
            individual = {"name": f.name, 
                    "id": f.id, 
                    "description": f.description, 
                    "owner": f.owner.username,
                    "assignee": f.assignee.username,
                    "created_at": f.created_at,
                    "updated_at": f.updated_at,
                    "total_owed_type": f.total_owed_type,
                    "total_owed_amt": f.total_owed_amt,
                    "privacy": f.privacy,
                    "owner_status": f.owner_status,
                    "assignee_status": f.assignee_status,
                    "is_active": f.active, #only show active in frontend
                    "is_completed": f.completed,
                    "tags": expected_tags,}
            expected_f_data.append(individual)
        expected = {"favors": expected_f_data}
        #print("assignee1 id: ", self.user_assignee1.id)
        #print("tag3 id: ", self.tag3.id)
        # Remove timestamps in output and expected data
        output['favors'] = [self.remove_timestamps(favor) for favor in output['favors']]
        expected['favors'] = [self.remove_timestamps(favor) for favor in expected['favors']]
        self.assertEqual(output, expected)
        
    # test sort 
    def test_filter_sort(self):
        self.maxDiff = None
        url = reverse('favor_list') + f'?sort_by=amount&order=descending'
        response = self.client.get(url)
        output = response.json()
        expected_f_data = []
        for f in list([self.favor2, self.favor4, self.favor1, self.favor3]):
            expected_tags = list(f.tags.all().values())
            individual = {"name": f.name, 
                    "id": f.id, 
                    "description": f.description, 
                    "owner": f.owner.username,
                    "assignee": f.assignee.username,
                    "created_at": f.created_at,
                    "updated_at": f.updated_at,
                    "total_owed_type": f.total_owed_type,
                    "total_owed_amt": f.total_owed_amt,
                    "privacy": f.privacy,
                    "owner_status": f.owner_status,
                    "assignee_status": f.assignee_status,
                    "is_active": f.active, #only show active in frontend
                    "is_completed": f.completed,
                    "tags": expected_tags,}
            expected_f_data.append(individual)
        expected = {"favors": expected_f_data}
        #print("assignee1 id: ", self.user_assignee1.id)
        #print("tag3 id: ", self.tag3.id)
        # Remove timestamps in output and expected data
        output['favors'] = [self.remove_timestamps(favor) for favor in output['favors']]
        expected['favors'] = [self.remove_timestamps(favor) for favor in expected['favors']]
        self.assertEqual(output, expected)

    # test searching
    def test_filter_sort(self):
        self.maxDiff = None
        url = reverse('favor_list') + f'?tag={self.tag1.id}&search=favor'
        response = self.client.get(url)
        output = response.json()
        expected_f_data = []
        for f in list([self.favor1, self.favor2]):
            expected_tags = list(f.tags.all().values())
            individual = {"name": f.name, 
                    "id": f.id, 
                    "description": f.description, 
                    "owner": f.owner.username,
                    "assignee": f.assignee.username,
                    "created_at": f.created_at,
                    "updated_at": f.updated_at,
                    "total_owed_type": f.total_owed_type,
                    "total_owed_amt": f.total_owed_amt,
                    "privacy": f.privacy,
                    "owner_status": f.owner_status,
                    "assignee_status": f.assignee_status,
                    "is_active": f.active, #only show active in frontend
                    "is_completed": f.completed,
                    "tags": expected_tags,}
            expected_f_data.append(individual)
        expected = {"favors": expected_f_data}
        # Remove timestamps in output and expected data
        output['favors'] = [self.remove_timestamps(favor) for favor in output['favors']]
        expected['favors'] = [self.remove_timestamps(favor) for favor in expected['favors']]
        self.assertEqual(output, expected)

class CreateFavorTestCase(TestCase):

    def setUp(self):
        self.client = Client()
        self.user_owner = User.objects.create_user(username='user1', password='password123!')
        self.user_assignee = User.objects.create_user(username='assignee1', password='password123!')
        self.client.login(username='user1', password='password123!')

    def test_valid_create_favor(self):
        f_data = {"name": "New Favor", 
                    "description": "this is a new favor", 
                    "owner": self.user_owner.id,
                    "assignee": self.user_assignee.id,
                    "total_owed_type": "Nonmonetary",
                    "privacy": "Public",}
        url = reverse('create_favor')
        response = self.client.post(url, f_data)
        output = response.json()
        # print(output)
        favor = Favor.objects.get(pk=output['favor_id'])
        self.assertEqual(response.status_code, 200)
        self.assertTrue(output['success'])
        self.assertEqual(favor.name, "New Favor")
        self.assertEqual(favor.owner, self.user_owner)
        self.assertEqual(favor.assignee, self.user_assignee)
        self.assertEqual(favor.total_owed_type, "Nonmonetary")
        self.assertEqual(favor.privacy, "Public")

    def test_invalid_create_favor(self):
        f_data = {"name": "", 
                    "description": "this is a new favor", 
                    "owner": self.user_owner.id,
                    "assignee": self.user_assignee.id,
                    "total_owed_type": "Nonmonetary",
                    "privacy": "Public",}
        url = reverse('create_favor')
        response = self.client.post(url, f_data)
        output = response.json()
        # print(output)
        self.assertEqual(response.status_code, 200)
        self.assertFalse(output['success'])

    def test_create_favor_get(self):
        url = reverse('create_favor')
        response = self.client.get(url)
        output = response.json()
        # print(output)
        self.assertEqual(response.status_code, 405)
        self.assertEqual(output['error'], "GET method not allowed")

class EditFavorTestCase(TestCase):

    def setUp(self):
        self.client = Client()
        self.user_owner = User.objects.create_user(username='user1', password='password123!')
        self.user_assignee = User.objects.create_user(username='assignee1', password='password123!')
        self.client.login(username='user1', password='password123!')

        self.favor1 = Favor.objects.create(
            name = "Favor 1",
            description = "first favor",
            owner=self.user_owner, 
            assignee=self.user_assignee,
            total_owed_type = "Monetary",
            total_owed_amt = '5.25',
            completed = False,
            privacy = "Private",
        )

    def test_valid_edit_favor(self):
        new_data = {"name": "Edited Favor",  
                    "description": "I edited this favor",
                    "owner": self.user_owner.id,
                    "assignee": self.user_assignee.id,
                    "total_owed_type": "Nonmonetary", 
                    "total_owed_amt": "",
                    "privacy": "Public",}
        url = reverse('edit_favor', args=[self.favor1.id])
        response = self.client.post(url, new_data)
        output = response.json()
        print(output)
        self.favor1.refresh_from_db()
        print(self.favor1)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(output['success'])
        self.assertEqual(self.favor1.name, "Edited Favor")
        self.assertEqual(self.favor1.description, "I edited this favor")
        self.assertEqual(self.favor1.owner, self.user_owner)
        self.assertEqual(self.favor1.assignee, self.user_assignee)
        self.assertEqual(self.favor1.total_owed_type, "Nonmonetary")
        self.assertIsNone(self.favor1.total_owed_amt)
        self.assertEqual(self.favor1.privacy, "Public")



    #def test_invalid_edit_favor(self, ):
