from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User
from .models import Favor
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



