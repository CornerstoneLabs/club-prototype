"""News article models."""

from django.db import models
from django.contrib.auth.models import User
import datetime


class Article(models.Model):
    """News article."""

    title = models.CharField(max_length=2000)
    content = models.TextField()
    author = models.ForeignKey(User)
    date_published = models.DateField(default=datetime.date.today)


class Location(models.Model):
    """Location description."""

    title = models.CharField(max_length=2000)


class Class(models.Model):
    """A class definition."""

    day = models.IntegerField(default=0)
    start = models.DateField()
    end = models.DateField()
    location = models.ForeignKey(Location)
    title = models.CharField(max_length=1000)
