# Generated by Django 3.2.9 on 2022-02-05 17:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('carts', '0008_auto_20220205_1657'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cart',
            name='order_items',
        ),
        migrations.AddField(
            model_name='cart',
            name='order_items',
            field=models.ManyToManyField(blank=True, to='carts.CartItem'),
        ),
    ]
