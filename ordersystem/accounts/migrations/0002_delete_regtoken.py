# Generated by Django 3.2.9 on 2022-03-22 15:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='RegToken',
        ),
    ]
