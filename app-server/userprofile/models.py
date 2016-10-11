"""A user profile shows the publically available information about a user."""
from django.db import models
from django.contrib.auth.models import User
import datetime


class UserProfile(models.Model):
    """Public user profile."""

    user = models.ForeignKey(User, related_name='profile')
    name = models.CharField(max_length=1000, blank=True, null=True)
    image = models.ImageField(blank=True, null=True)
    date_created = models.DateField(default=datetime.datetime.now)

    def image_url(self):
        """Return image URL."""
        if self.image and self.image.url:
            return self.image.url
        else:
            return ''
