# Generated by Django 3.2.9 on 2022-03-31 09:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('carts', '0034_auto_20220328_1312'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cartitem',
            name='image',
            field=models.ImageField(blank=True, upload_to=''),
        ),
    ]
