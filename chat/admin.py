from django.contrib import admin
from .models import Chatroom,Message
# Register your models here.

admin.site.register(Message) 
admin.site.register(Chatroom) 