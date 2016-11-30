"""News article models."""

from django.db import models
from django.contrib.auth.models import User
import datetime
from urllib.request import urlopen


def notify():
    """Send notification."""
    result = urlopen('http://192.168.1.65:3000/update')
    content = result.read()
    return content


class Article(models.Model):
    """News article."""

    title = models.CharField(max_length=2000, blank=True, null=True)
    content = models.TextField(blank=True, null=True)
    author = models.ForeignKey(User)
    date_created = models.DateTimeField(default=datetime.datetime.now)
    date_published = models.DateField(blank=True, null=True)
    image = models.ImageField(blank=True, null=True)
    published = models.BooleanField(default=False)

    def image_url(self):
        """Return image URL."""
        if self.image and self.image.url:
            return self.image.url
        else:
            return ''

    def save(self, *args, **kwargs):
        """Send update."""
        print('save')
        notify()

        result = super(Article, self).save(*args, **kwargs)

        return result

    def __unicode__(self):
        """List override."""
        return self.content


class ArticleComment(models.Model):
    """News article comment."""

    article = models.ForeignKey(Article)
    content = models.TextField(blank=True, null=True)
    author = models.ForeignKey(User)
    date_created = models.DateTimeField(default=datetime.datetime.now)
