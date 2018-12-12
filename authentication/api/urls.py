from django.urls import path

from .views import RegistrationAPI, CategoriesAPI, LoginAPI

urlpatterns = [
    path('registration/', RegistrationAPI.as_view()),
    path('login/', LoginAPI.as_view()),
    path('categories/', CategoriesAPI.as_view())
]