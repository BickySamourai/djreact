# Create your models here.
from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Chatroom(models.Model):
    nameRoom = models.TextField()
    creation_date = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.nameRoom

class Message(models.Model):
    author = models.ForeignKey(User,related_name='author_messages',on_delete=models.CASCADE)
    content = models.TextField()
    date_sent = models.DateTimeField(auto_now_add=True)
    chat = models.ForeignKey(Chatroom, on_delete=models.CASCADE,null=False)
    
    def __str__(self):
        return self.author.username
