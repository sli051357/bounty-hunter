# Generated by Django 4.2.14 on 2024-07-15 15:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('favors', '0005_remove_favor_tags_remove_tag_favors_tag_favor_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tag',
            name='favor',
        ),
        migrations.AddField(
            model_name='tag',
            name='favors',
            field=models.ManyToManyField(related_name='tag', to='favors.favor'),
        ),
    ]