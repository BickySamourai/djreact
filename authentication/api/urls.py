from django.urls import path

from .views import RegistrationAPI, CategoriesAPI

urlpatterns = [
    path('registration/', RegistrationAPI.as_view()),
    path('categories/', CategoriesAPI.as_view())
]