from rest_framework import serializers
from django.conf import settings
from django.contrib.auth import get_user_model, authenticate
from authentication.models import Categories, FavoriteCategories

User = get_user_model()

class CreateUserSerializer(serializers.ModelSerializer):
    #categories = serializers.CharField()
    password2 = serializers.CharField()
    #print(categories)
    class Meta:
        model = User
        fields = ('id', 'username','email', 'password','password2','last_name','first_name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        print(validated_data)
        if validated_data['password'] != validated_data['password2']:
           raise serializers.ValidationError(("Les 2 mots de passe ne correspondent pas."))
        else : 
            user = User(username=validated_data['username'],email=validated_data['email'],password=validated_data['password'],last_name=validated_data['last_name'],first_name=validated_data['first_name'],premium_account=False)
            user.set_password(user.password)
            user.save()
            return user


class UserSerializer(serializers.ModelSerializer): #returns what we will need
    class Meta:
        model = User
        fields = ('id', 'username','email','last_name','first_name','premium_account','is_staff')
  




class LoginSerializer(serializers.ModelSerializer):  
    class Meta:
        model = User
        fields = ('username','password') 

    def validate_username(self,username,password):  
        print('1')
        print(username)
        user = None
        user=authenticate(username = username, password = password)
        print(user)
        if user is None : #try with email
            user=authenticate(email = username, password = password)
            print(user)
        if user is None :
            raise serializers.ValidationError("Unable to log in with provided credentials.")

        return user    
            

class CategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ('name',)

class FavoriteCategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteCategories
        fields = ('name',)
