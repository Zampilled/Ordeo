# Generated by Django 3.2.9 on 2022-03-31 14:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('carts', '0035_alter_cartitem_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cartitem',
            name='quantity',
            field=models.PositiveIntegerField(default=1),
        ),
    ]
