# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2016-09-14 20:57
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('classes', '0002_auto_20160914_1959'),
    ]

    operations = [
        migrations.AddField(
            model_name='class',
            name='image',
            field=models.ImageField(default='', upload_to=''),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='class',
            name='end_hours',
            field=models.IntegerField(choices=[(0, '00'), (1, '01'), (2, '02'), (3, '03'), (4, '04'), (5, '05'), (6, '06'), (7, '07'), (8, '08'), (9, '09'), (10, '10'), (11, '11'), (12, '12'), (13, '13'), (14, '14'), (15, '15'), (16, '16'), (17, '17'), (18, '18'), (19, '19'), (20, '20'), (21, '21'), (22, '22'), (23, '23')]),
        ),
        migrations.AlterField(
            model_name='class',
            name='end_minutes',
            field=models.IntegerField(choices=[(0, '00'), (10, '10'), (20, '20'), (30, '30'), (40, '40'), (50, '50')]),
        ),
        migrations.AlterField(
            model_name='class',
            name='start_hours',
            field=models.IntegerField(choices=[(0, '00'), (1, '01'), (2, '02'), (3, '03'), (4, '04'), (5, '05'), (6, '06'), (7, '07'), (8, '08'), (9, '09'), (10, '10'), (11, '11'), (12, '12'), (13, '13'), (14, '14'), (15, '15'), (16, '16'), (17, '17'), (18, '18'), (19, '19'), (20, '20'), (21, '21'), (22, '22'), (23, '23')]),
        ),
        migrations.AlterField(
            model_name='class',
            name='start_minutes',
            field=models.IntegerField(choices=[(0, '00'), (10, '10'), (20, '20'), (30, '30'), (40, '40'), (50, '50')]),
        ),
    ]