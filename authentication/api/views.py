from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response

from rest_framework.authtoken.models import Token
from django.conf import settings

from ..models import Users, Categories, FavoriteCategories
from .serializers import CreateUserSerializer, UserSerializer, CategorieSerializer
from rest_framework.permissions import AllowAny


import base64

from django.views.generic import RedirectView
from django.views.generic.base import TemplateView
from furl import furl
from django.conf import settings
from django.urls import reverse
import requests


class RegistrationAPI(generics.CreateAPIView):
    queryset = Users.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        print('post')
        categories = request.data['categories']
        del request.data['categories']
        serializer = self.get_serializer(data=request.data)
        print(request.data)

        serializer.is_valid(raise_exception=True)
        print('post')
        user = serializer.save()
        user_serialized = UserSerializer(
            user, context=self.get_serializer_context()).data
        print(user)
        for name_categorie in categories:
            categorie = Categories(name=name_categorie)
            if categorie:
                favorite_categorie = FavoriteCategories(
                    user=user, name=categorie)
                favorite_categorie.save()

        token = Token.objects.create(user=user)
        return Response({
            "user": user_serialized,
            "categories": categories,
            "token": token.key
        })


class CategoriesAPI(generics.ListAPIView):
    queryset = Categories.objects.all()
    serializer_class = CategorieSerializer


def build_authorize_url(request):

    params = {
        "client_id": "aa927d72ee3348d7b5d786c7e1795739",
        "response_type": "code",
        "redirect_uri": "http://localhost:3000/spotify/login",
        "scope": " ".join(
            [

                "user-read-private",
                "user-read-email"
            ]
        ),
    }

    # print(params)

    url = (
        furl("https://accounts.spotify.com/authorize")
        .add(params)
        .url
    )
    print(url)

    return url


AUTH_HEADER = {
    "Authorization": "Basic "
    + base64.b64encode(
        "aa927d72ee3348d7b5d786c7e1795739:72c80e7806c144c89d46c22be7b17ff8".encode()
    ).decode()
}


def handle_callback(request):
    code = request.GET["code"]

    response = requests.post(
        "https://accounts.spotify.com/api/token",
        data={
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": request.build_absolute_uri(
                reverse("spotify callback")
            ),
        },
        headers=AUTH_HEADER,
    )

    return response.json()


class SpotifyLoginView(RedirectView):

    query_string = True

    def get_redirect_url(self, *args, **kwargs):
        return build_authorize_url(self.request)


class SpotifyCallbackView(TemplateView):
    template_name = "success.html"

    def get(self, request, *args, **kwargs):
        print(handle_callback(request))

        return super().get(request, *args, **kwargs)
