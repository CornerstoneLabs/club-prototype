"""This is where we put all the bits for the brand."""

from django.db import models


class Brand(models.Model):
    """Custom brand."""

    title = models.CharField(max_length=2000)
    phone = models.CharField(max_length=2000)
    email = models.CharField(max_length=2000)
    image = models.ImageField()

    def __str__(self):
        """Default item."""
        return self.title

    def image_url(self):
        """Return image URL."""
        return self.image.url
