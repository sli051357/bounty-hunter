# Generated by Django 5.0.6 on 2024-08-20 18:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wishlist', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='wishlist',
            name='URL',
        ),
        migrations.AddField(
            model_name='wishlist',
            name='description',
            field=models.CharField(default='', max_length=200),
        ),
    ]
