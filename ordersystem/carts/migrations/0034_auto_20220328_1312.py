# Generated by Django 3.2.9 on 2022-03-28 12:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('carts', '0033_remove_cart_ordered'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderitem',
            name='image',
            field=models.ImageField(blank=True, upload_to=''),
        ),
        migrations.AddField(
            model_name='orderitem',
            name='productId',
            field=models.IntegerField(default=0),
        ),
    ]
