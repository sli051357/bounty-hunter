# Generated by Django 5.0.7 on 2024-08-12 22:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('favors', '0002_favor_total_owed_wishlist'),
    ]

    operations = [
        migrations.AddField(
            model_name='favor',
            name='points_value',
            field=models.IntegerField(default=100),
        ),
    ]
