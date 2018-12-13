from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from rest_framework.response import Response
from .models import Chatroom,Message
from rest_framework import status, permissions
from .serializers import ChatroomSerializer
from django.core import serializers
import json
from rest_framework.decorators import api_view
from django.http import HttpResponse

#@login_required
@api_view(['GET'])
def allRooms(request):
    #id_user = request.user.id
    all_objects = list(Chatroom.objects.all()) + list(Message.objects.all())
    chatrooms = serializers.serialize('json', all_objects)
    return Response(json.loads(chatrooms), status=status.HTTP_200_OK)


def getInfoRoom(request,room_name):
    print("Je passe " + room_name)
    return HttpResponse()