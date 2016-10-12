"""A user profile shows the publically available information about a user."""
from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
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


def check_profile_exists(sender, instance, signal, *args, **kwargs):
    """Create a profile if a user does not have one."""
    if sender is User:
        if UserProfile.objects.filter(user=instance).count() == 0:
            user_profile = UserProfile()
            user_profile.user = instance
            user_profile.name = instance.first_name
            user_profile.save()


post_save.connect(check_profile_exists, sender=User)
