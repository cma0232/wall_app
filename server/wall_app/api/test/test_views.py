from .test_setup import TestSetUp
from django.test import Client
from django.core import mail

class TestViews(TestSetUp):

    # test user cann't register without data
    def test_user_cannot_register_without_data(self):
        client = Client()
        response = client.post('/api/users/')
        assert response.status_code, 400

    # test user can register with correct formated data
    def test_user_can_register(self):
        client = Client()
        response = client.post('/api/users/', self.userData)
        assert response.data['username'], self.userData['username']
        assert response.data['email'], self.userData['email']
        assert response.status_code, 201

    # test send email after register
    def test_send_email(self):
        client = Client()
        client.post('/api/users/', self.userData)
        mail.send_mail(
            'Welcome!🥳',
            'Welcome to your wall. Hurry up and post your first message!',
            'shiningmch@gmail.com',
            [self.userData['email']]
        )
        assert len(mail.outbox), 1
        assert mail.outbox[0].subject == 'Welcome!🥳'
        assert mail.outbox[0].body == 'Welcome to your wall. Hurry up and post your first message!'
        assert mail.outbox[0].from_email == 'shiningmch@gmail.com'
        assert mail.outbox[0].to == [self.userData['email']]

    # test user can login after register
    def test_login(self): 
        client = Client()
        # register
        client.post('/api/users/', self.userData)
        # login
        response = client.post('/auth/', self.userData)
        assert response.status_code, 200 
        
    # test user can login without email after register(username and password is required)
    def test_login_without_email(self):
        client = Client()
        # register
        client.post('/api/users/', self.userData)
        # login
        response = client.post(
            '/auth/', {'username': 'test_um', 'email': '', 'password': 'test'})
        assert response.status_code, 200

    # test user can post message after login
    def test_post_message(self):
        client = Client()
        # register
        client.post('/api/users/', self.userData)
        # login
        client.post('/auth/', self.userData)
        # post a message
        response = client.post('/api/wall/', self.message)

        assert response.status_code, 200

    # test guest can see all the message on the wall
    def test_guest_can_see_messsage(self):
        client = Client()
        response = client.get('/api/wall/')
        
        assert response.status_code, 200
