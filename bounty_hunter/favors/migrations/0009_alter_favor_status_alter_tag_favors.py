# Generated by Django 4.2.14 on 2024-07-15 17:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('favors', '0008_alter_favor_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='favor',
            name='status',
            field=models.CharField(choices=[('Pending creation', 'Pending creation'), ('Pending edits', 'Pending edits'), ('Pending deletion', 'Pending deletion'), ('Complete', 'Complete'), ('Incomplete', 'Incomplete')], max_length=16),
        ),
        migrations.AlterField(
            model_name='tag',
            name='favors',
            field=models.ManyToManyField(blank=True, related_name='tags', related_query_name='tag', to='favors.favor'),
        ),
    ]
