"""News article models."""

from django.db import models
from django.contrib.auth.models import User
import datetime


class Article(models.Model):
    """News article."""

    title = models.CharField(max_length=2000)
    content = models.TextField()
    author = models.ForeignKey(User)
    date_published = models.DateField(default=datetime.datetime.today)
    image = models.ImageField(blank=True, null=True)

    def image_url(self):
        """Return image URL."""
        if self.image and self.image.url:
            return self.image.url
        else:
            return ''
