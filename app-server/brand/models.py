"""This is where we put all the bits for the brand."""

from django.db import models
from django.contrib.auth.models import User


class Brand(models.Model):
    """Custom brand."""

    title = models.CharField(max_length=2000)
    phone = models.CharField(max_length=2000)
    email = models.CharField(max_length=2000)
    image = models.ImageField(blank=True, null=True)
    participants = models.ManyToManyField(User, blank=True, related_name='brand_participant')
    admins = models.ManyToManyField(User, blank=True, related_name='brand_admin')
    validated = models.ManyToManyField(User, blank=True, related_name='brand_validated')

    def __str__(self):
        """Default item."""
        return self.title

    def image_url(self):
        """Return image URL."""
        if self.image and self.image.url:
            return self.image.url
        else:
            return ''
