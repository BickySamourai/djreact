from django.urls import path

from .views import MusicListView, MusicDetailView, CreateMusicView

urlpatterns = [
    path('', MusicListView.as_view()),
    path('create/', CreateMusicView.as_view()),
    path('<pk>', MusicDetailView.as_view()),
]