# Generated by Django 4.0.3 on 2023-04-25 01:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("service_rest", "0002_alter_technician_employee_id"),
    ]

    operations = [
        migrations.AlterField(
            model_name="automobilevo",
            name="vin",
            field=models.CharField(max_length=200, unique=True),
        ),
    ]
