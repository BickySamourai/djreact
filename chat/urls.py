from django.contrib import admin
from django.urls import path,re_path
from .views import allRooms,getInfoRoom



urlpatterns = [
    path('', allRooms, name='room'),
    re_path(r'^(?P<room_name>[^/]+)/$', getInfoRoom, name='room'),
]
