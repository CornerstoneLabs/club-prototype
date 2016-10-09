"""News article models."""

from django.db import models
from django.contrib.auth.models import User
import datetime


class Article(models.Model):
    """News article."""

    title = models.CharField(max_length=2000)
    content = models.TextField(blank=True, null=True)
    author = models.ForeignKey(User)
    date_created = models.DateField(default=datetime.datetime.today)
    date_published = models.DateField(blank=True, null=True)
    image = models.ImageField(blank=True, null=True)
    published = models.BooleanField(default=False)

    def image_url(self):
        """Return image URL."""
        if self.image and self.image.url:
            return self.image.url
        else:
            return ''
