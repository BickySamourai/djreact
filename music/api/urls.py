from django.urls import path

from .views import MusicListView, MusicDetailView

urlpatterns = [
    path('', MusicListView.as_view()),
    path('<pk>', MusicDetailView.as_view())
]