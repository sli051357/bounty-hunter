# Generated by Django 4.2.14 on 2024-07-10 23:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=10)),
                ('color', models.CharField(help_text='Enter a valid hex code, ie #123456 or #ABC', max_length=7)),
                ('tag_type', models.CharField(choices=[('Preset', 'Preset'), ('Custom', 'Custom')], max_length=6)),
            ],
        ),
        migrations.CreateModel(
            name='Favor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=60)),
                ('description', models.CharField(max_length=600)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('total_owed_type', models.CharField(choices=[('Monetary', 'Monetary'), ('Nonmonetary', 'Nonmonetary')], max_length=11)),
                ('total_owed_amt', models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True)),
                ('privacy', models.CharField(choices=[('Private', 'Private'), ('Public', 'Public')], max_length=7)),
                ('status', models.CharField(choices=[('Pending', 'Pending'), ('Complete', 'Complete'), ('Incomplete', 'Incomplete')], max_length=10)),
                ('assignee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='assigned_favors', to=settings.AUTH_USER_MODEL)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('tags', models.ManyToManyField(to='favors.tag')),
            ],
        ),
    ]
