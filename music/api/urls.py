from django.urls import path

from .views import MusicListView, MusicDetailView, MusicFilterView

urlpatterns = [
    path('', MusicListView.as_view()),
    path('search/<music_name>', MusicFilterView.as_view()),
    
]