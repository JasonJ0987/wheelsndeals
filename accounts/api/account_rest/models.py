from django.db import models


class RoleVO(models.Model):
    title=models.CharField(max_length=200)


class Account(models.Model):
    username = models.CharField(max_length=200, unique=True)
    password = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    created = models.DateTimeField(auto_now_add=True)
    role = models.ForeignKey(
        RoleVO,
        related_name="account",
        on_delete=models.CASCADE
    )
    