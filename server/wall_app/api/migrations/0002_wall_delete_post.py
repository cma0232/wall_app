# Generated by Django 4.0 on 2021-12-23 22:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Wall',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField(max_length=150)),
            ],
        ),
        migrations.DeleteModel(
            name='Post',
        ),
    ]
