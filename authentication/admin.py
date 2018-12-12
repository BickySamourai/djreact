from django.contrib import admin

# Register your models here.
from .models import Users,Categorie,FavoriteCategorie

admin.site.register(Users)
admin.site.register(Categorie)
admin.site.register(FavoriteCategorie)
