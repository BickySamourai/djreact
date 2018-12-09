from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.



class Users(AbstractUser):
    premium_account = models.BooleanField(default=False,verbose_name="premium account")
    deleted = models.BooleanField(default=False,verbose_name="deleted")
    version_number = models.IntegerField(default=0,verbose_name="version number")

class Categories(models.Model): #without s
    name = models.CharField(max_length=30, primary_key=True)
    version_number = models.IntegerField(default=0)

class FavoriteCategories(models.Model): #without s
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    name = models.ForeignKey(Categories, on_delete=models.CASCADE)
