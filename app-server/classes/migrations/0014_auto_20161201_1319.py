# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2016-12-01 13:19
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('classes', '0013_auto_20160925_0932'),
    ]

    operations = [
        migrations.CreateModel(
            name='ClassSchedule',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('day', models.IntegerField(choices=[(0, 'Monday'), (1, 'Tuesday'), (2, 'Wednesday'), (3, 'Thursday'), (4, 'Friday'), (5, 'Saturday'), (6, 'Sunday')], default=0)),
                ('start_hours', models.IntegerField(choices=[(0, '00'), (1, '01'), (2, '02'), (3, '03'), (4, '04'), (5, '05'), (6, '06'), (7, '07'), (8, '08'), (9, '09'), (10, '10'), (11, '11'), (12, '12'), (13, '13'), (14, '14'), (15, '15'), (16, '16'), (17, '17'), (18, '18'), (19, '19'), (20, '20'), (21, '21'), (22, '22'), (23, '23')])),
                ('start_minutes', models.IntegerField(choices=[(0, '00'), (15, '15'), (30, '30'), (45, '45')])),
                ('end_hours', models.IntegerField(choices=[(0, '00'), (1, '01'), (2, '02'), (3, '03'), (4, '04'), (5, '05'), (6, '06'), (7, '07'), (8, '08'), (9, '09'), (10, '10'), (11, '11'), (12, '12'), (13, '13'), (14, '14'), (15, '15'), (16, '16'), (17, '17'), (18, '18'), (19, '19'), (20, '20'), (21, '21'), (22, '22'), (23, '23')])),
                ('end_minutes', models.IntegerField(choices=[(0, '00'), (15, '15'), (30, '30'), (45, '45')])),
                ('location', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='classes.Location')),
                ('teacher', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.RemoveField(
            model_name='class',
            name='day',
        ),
        migrations.RemoveField(
            model_name='class',
            name='end_hours',
        ),
        migrations.RemoveField(
            model_name='class',
            name='end_minutes',
        ),
        migrations.RemoveField(
            model_name='class',
            name='location',
        ),
        migrations.RemoveField(
            model_name='class',
            name='start_hours',
        ),
        migrations.RemoveField(
            model_name='class',
            name='start_minutes',
        ),
        migrations.RemoveField(
            model_name='class',
            name='teacher',
        ),
        migrations.AddField(
            model_name='class',
            name='class_schedule',
            field=models.ManyToManyField(to='classes.ClassSchedule'),
        ),
        migrations.AddField(
            model_name='classsession',
            name='scheduled_class',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='classes.ClassSchedule'),
        ),
    ]
