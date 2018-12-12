from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response

from rest_framework.authtoken.models import Token
from django.conf import settings

from ..models import Users,Categorie,FavoriteCategorie
from .serializers import  CreateUserSerializer, UserSerializer, CategorieSerializer, LoginSerializer, FavoriteCategorieSerializer
from rest_framework.permissions import AllowAny


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
        user_serialized = UserSerializer(user, context=self.get_serializer_context()).data
        print(user)
        for name_categorie in categories:
            categorie = Categorie(name=name_categorie)
            if categorie:
                favorite_categorie = FavoriteCategorie(user=user,name = categorie)
                favorite_categorie.save()

        token = Token.objects.create(user=user)
        return Response({
            "user": user_serialized,
            "categories": categories,
            "token": token.key
        })


class LoginAPI(generics.GenericAPIView):
    queryset = Users.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        print('2')
        #serializer.is_valid(raise_exception=True)
        
        user = serializer.validate_username(request.data['username'],request.data['password'])
        #user = serializer.valide
        print(user)
        user_serialized = UserSerializer(user, context=self.get_serializer_context()).data
        print(user_serialized)
        categories = FavoriteCategorie.objects.filter(user=user)
        categories_serialized = []
        for categorie in categories :
            categories_serialized.append(FavoriteCategorieSerializer(categorie, context=self.get_serializer_context()).data)
            
        token = Token.objects.get(user=user)
        print(token)
        return Response({
            "user": user_serialized,
            "categories": categories_serialized,
            "token": token.key
        })
        


class CategoriesAPI(generics.ListAPIView):
    queryset = Categorie.objects.all()
    serializer_class = CategorieSerializer