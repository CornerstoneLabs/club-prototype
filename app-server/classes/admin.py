"""Admin."""

import datetime
from django.contrib import admin
from classes.models import Class
from classes.models import Location
from classes.models import ClassSession


def create_sessions(modeladmin, request, queryset):
    """Create some sessions for a class."""
    for item in queryset:
        date_start = datetime.date.today()
        date_end = date_start + datetime.timedelta(days=30)

        if not item.recurring:
            date_start = item.sessions_start
            date_end = item.sessions_end

        loop_date = date_start

        while loop_date < date_end:
            weekday = loop_date.weekday()

            if weekday == item.day:
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

            loop_date += datetime.timedelta(days=1)


create_sessions.short_description = 'Create sessions'


class ClassAdmin(admin.ModelAdmin):
    """Admin definition for class."""

    actions = [
        create_sessions
    ]

admin.site.register(Class, ClassAdmin)
admin.site.register(ClassSession)
admin.site.register(Location)
