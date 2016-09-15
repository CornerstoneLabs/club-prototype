"""Admin."""

import datetime
from django.contrib import admin
from classes.models import Class
from classes.models import Location
from classes.models import ClassSession
from classes.models import ClassSessionNotification


def pad_class_day(item, loop_date):
    """Create session for day."""
    new_start = datetime.datetime(
        loop_date.year,
        loop_date.month,
        loop_date.day,
        item.start_hours,
        item.start_minutes,
        0
    )
    new_end = datetime.datetime(
        loop_date.year,
        loop_date.month,
        loop_date.day,
        item.end_hours,
        item.end_minutes,
        0
    )

    if ClassSession.objects.filter(parent_class=item, session_start=new_start, session_end=new_end).count() == 0:
        new_session = ClassSession()
        new_session.parent_class = item
        new_session.session_start = new_start
        new_session.session_end = new_end
        new_session.save()


def pad_class_range(item):
    """Create some sessions for a class."""
    date_start = datetime.date.today()
    date_end = date_start + datetime.timedelta(days=30)

    if not item.recurring:
        date_start = item.sessions_start
        date_end = item.sessions_end

    loop_date = date_start

    while loop_date < date_end:
        weekday = loop_date.weekday()

        if weekday == item.day:
            pad_class_day(item, loop_date)

        loop_date += datetime.timedelta(days=1)


def create_sessions(modeladmin, request, queryset):
    """Create sessions for a range of classes."""
    for item in queryset:
        pad_class_range(item)


create_sessions.short_description = 'Create sessions'


class ClassAdmin(admin.ModelAdmin):
    """Admin definition for class."""

    actions = [
        create_sessions
    ]


class ClassSessionAdmin(admin.ModelAdmin):
    """Admin definitions for classSession."""

    list_display = (
        'parent_class',
        'session_day',
        'start_time',
        'end_time',
    )

admin.site.register(Class, ClassAdmin)
admin.site.register(ClassSession, ClassSessionAdmin)
admin.site.register(Location)
admin.site.register(ClassSessionNotification)
