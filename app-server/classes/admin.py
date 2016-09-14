"""Admin."""

from django.contrib import admin
from classes.models import Class
from classes.models import Location

admin.site.register(Class)
admin.site.register(Location)
