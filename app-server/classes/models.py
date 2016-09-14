"""Classes."""
from django.db import models
from django.contrib.auth.models import User


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

    def __str__(self):
        """Return title."""
        return self.title
