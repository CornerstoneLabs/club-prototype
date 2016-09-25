"""Cron task to pad the sessions daily."""

from django_cron import CronJobBase, Schedule
from classes.models import Class
from classes.admin import pad_class_range


class PadSessionsJob(CronJobBase):
    """Cron task to pad the sessions daily."""

    RUN_EVERY_MINS = 60 * 24  # every 24 hours

    schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
    code = 'clubserver.cron_tasks_session'    # a unique code

    def do(self):
        """Execute code."""
        all_classes = Class.objects.all()

        for loop_class in all_classes:
            self.stdout.write(self.style.SUCCESS('Padding class "%s"' % loop_class))
            pad_class_range(loop_class)
