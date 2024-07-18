# Generated by Django 4.2.14 on 2024-07-15 15:29

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('favors', '0004_tag_favors_alter_favor_tags_alter_tag_color'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='favor',
            name='tags',
        ),
        migrations.RemoveField(
            model_name='tag',
            name='favors',
        ),
        migrations.AddField(
            model_name='tag',
            name='favor',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='tags', related_query_name='tag', to='favors.favor'),
        ),
        migrations.AlterField(
            model_name='favor',
            name='description',
            field=models.TextField(max_length=600),
        ),
        migrations.AlterField(
            model_name='favor',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='owned_favors', to=settings.AUTH_USER_MODEL),
        ),
    ]
