from django.urls import path
from django.conf.urls import include

from .views import RegistrationAPI, CategoriesAPI


from .views import SpotifyLoginView
#from .views import SpotifyCallbackView


urlpatterns = [
    path('registration/', RegistrationAPI.as_view()),
    path('categories/', CategoriesAPI.as_view()),
    #path("spotify/callback/", SpotifyCallbackView.as_view()),
    path("login/", SpotifyLoginView.as_view())

]
