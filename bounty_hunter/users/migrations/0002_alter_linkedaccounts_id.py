# Generated by Django 5.0.6 on 2024-07-09 17:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='linkedaccounts',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]