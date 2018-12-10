from django.db import models
from django.utils import timezone

# Create your models here.

class Music(models.Model):
    title = models.CharField(max_length=30)
    artist = models.CharField(max_length=30, blank=True, null=True)
    description = models.CharField(max_length=30)
    release_date = models.DateField(default=timezone.now, verbose_name='Realease date')
    category = models.IntegerField(default=1)
    album = models.CharField(max_length=30, blank=True, null=True)
    url = models.CharField(max_length=60, blank=True, null=True)
    music_cover = models.CharField(max_length=60, blank=True, null=True)
    


def __str__(self):
    return self.titre