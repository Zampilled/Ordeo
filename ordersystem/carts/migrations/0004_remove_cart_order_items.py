# Generated by Django 3.2.9 on 2022-02-05 15:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('carts', '0003_cartitem'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cart',
            name='order_items',
        ),
    ]
