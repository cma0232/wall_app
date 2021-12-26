from rest_framework.test import APITestCase
from faker import Faker

class TestSetUp(APITestCase):
    def setUp(self):
        self.fake = Faker()

        self.userData = {
            'username': self.fake.first_name(),
            'email': self.fake.email(),
            'password': self.fake.first_name()
        }

        self.message = {
            'message': 'this is a test message'
        }

        return super().setUp()

    def tearDown(self):
        return super().tearDown()
