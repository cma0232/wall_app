from django.db import models


class Wall(models.Model):
    message = models.TextField(max_length=150, blank=False, null=False)
