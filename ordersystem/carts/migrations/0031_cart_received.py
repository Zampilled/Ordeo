# Generated by Django 3.2.9 on 2022-03-25 13:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('carts', '0030_remove_cart_received'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='received',
            field=models.BooleanField(default=False),
        ),
    ]
