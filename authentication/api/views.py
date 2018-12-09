from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response

from rest_framework.authtoken.models import Token
from django.conf import settings

from ..models import Users,Categories,FavoriteCategories
from .serializers import  CreateUserSerializer, UserSerializer, CategorieSerializer
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
            categorie = Categories(name=name_categorie)
            if categorie:
                favorite_categorie = FavoriteCategories(user=user,name = categorie)
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