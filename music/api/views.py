from rest_framework.generics import ListAPIView, RetrieveAPIView

from .serializers import MusicSerializer
from music.models import Music


class MusicListView(ListAPIView):
    queryset = Music.objects.all()
    serializer_class = MusicSerializer

class MusicDetailView(RetrieveAPIView):
    queryset = Music.objects.all()
    serializer_class = MusicSerializer
