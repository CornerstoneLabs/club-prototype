from django.core.management.base import BaseCommand
from django.core.management.base import CommandError
from classes.models import Class
from classes.admin import pad_class_range

class Command(BaseCommand):
    help = 'Pad a class with sessions.'

    def handle(self, *args, **options):
        all_classes = Class.objects.all()

        for loop_class in all_classes:
            self.stdout.write(self.style.SUCCESS('Padding class "%s"' % loop_class))
            pad_class_range(loop_class)
