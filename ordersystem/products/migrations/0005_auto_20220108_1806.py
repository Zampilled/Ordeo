# Generated by Django 3.2.9 on 2022-01-08 18:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0004_product_instock'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='inStock',
        ),
        migrations.AddField(
            model_name='product',
            name='quantity',
            field=models.IntegerField(default=0),
        ),
    ]