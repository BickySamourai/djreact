from rest_framework.generics import ListAPIView, RetrieveAPIView
from .serializers import MusicSerializer
from music.models import Music
from django.db.models import Q

class MusicListView(ListAPIView):
    queryset = Music.objects.all()
    serializer_class = MusicSerializer

class MusicDetailView(RetrieveAPIView):
    queryset = Music.objects.all()
    serializer_class = MusicSerializer

class MusicFilterView(ListAPIView):
    serializer_class = MusicSerializer

    def get_queryset(self):
        name = self.kwargs['music_name']
        name = name.split("=")[1]
        return Music.objects.filter(Q(title__istartswith=name) | Q(artist__istartswith=name))