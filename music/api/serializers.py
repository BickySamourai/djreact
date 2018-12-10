from rest_framework import serializers

from music.models import Music


class MusicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Music
        fields = ('id', 'title', 'artist', 'description', 'release_date', 'category', 'album', 'url', 'music_cover')
