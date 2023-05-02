from django.db import models


class Account(models.Model):
    username = models.CharField(max_length=200, unique=True)
    password = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username
