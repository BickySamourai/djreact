from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView

from .serializers import MusicSerializer
from music.models import Music


class MusicListView(ListAPIView):
    queryset = Music.objects.all()
    serializer_class = MusicSerializer

class MusicDetailView(RetrieveAPIView):
    queryset = Music.objects.all()
    serializer_class = MusicSerializer

class CreateMusicView(CreateAPIView):
    queryset = Music.objects.all()
    serializer_class = MusicSerializer
