"""Classes."""
from django.db import models
from django.contrib.auth.models import User
import datetime


DAY_NAME = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
]
DAY_PICKER = [(i, DAY_NAME[i]) for i in range(7)]
HOURS_PICKER = [(i, str(i).rjust(2, '0')) for i in range(24)]
MINUTES_PICKER = [(i, str(i).rjust(2, '0')) for i in range(0, 60, 10)]


class Location(models.Model):
    """Location description."""

    title = models.CharField(max_length=2000)

    def __str__(self):
        """Return text."""
        return self.title


class ClassSessionNotification(models.Model):
    """Notification for a single session."""

    text = models.CharField(max_length=2000)
    author = models.ForeignKey(User)
    date_published = models.DateField(default=datetime.date.today)


class Class(models.Model):
    """A class definition."""

    day = models.IntegerField(default=0, choices=DAY_PICKER)

    start_hours = models.IntegerField(choices=HOURS_PICKER)
    start_minutes = models.IntegerField(choices=MINUTES_PICKER)

    end_hours = models.IntegerField(choices=HOURS_PICKER)
    end_minutes = models.IntegerField(choices=MINUTES_PICKER)

    location = models.ForeignKey(Location)
    title = models.CharField(max_length=1000)
    teacher = models.ForeignKey(User)

    image = models.ImageField()

    recurring = models.BooleanField(default=True)
    sessions_start = models.DateField(blank=True, null=True)
    sessions_end = models.DateField(blank=True, null=True)

    def __str__(self):
        """Return title."""
        return self.title


class ClassSession(models.Model):
    """A single session of a class."""

    parent_class = models.ForeignKey(Class)
    notifications = models.ManyToManyField(ClassSessionNotification, blank=True)
    session_start = models.DateTimeField()
    session_end = models.DateTimeField()

    def __str__(self):
        """Return title."""
        return '%s %s %s' % (self.parent_class.title, self.session_start, self.session_end)
