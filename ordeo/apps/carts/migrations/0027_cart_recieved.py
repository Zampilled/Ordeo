# Generated by Django 3.2.9 on 2022-03-22 18:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('carts', '0026_cart_sent'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='recieved',
            field=models.BooleanField(default=False),
        ),
    ]