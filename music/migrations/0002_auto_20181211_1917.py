# Generated by Django 2.1.4 on 2018-12-11 18:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='music',
            old_name='categorie',
            new_name='category',
        ),
    ]