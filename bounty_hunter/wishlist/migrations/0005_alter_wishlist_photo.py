# Generated by Django 5.0.6 on 2024-08-21 18:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wishlist', '0004_wishlist_deleted'),
    ]

    operations = [
        migrations.AlterField(
            model_name='wishlist',
            name='photo',
            field=models.ImageField(default='wishlist/res/default_wishlistpic.png', max_length=400, upload_to='wishlist/res/'),
        ),
    ]