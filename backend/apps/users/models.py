import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models


class Role(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=80, unique=True)
    description = models.CharField(max_length=255, blank=True)
    permissions = models.JSONField(default=dict, blank=True)

    class Meta:
        db_table = "users_role"
        ordering = ["name"]

    def __str__(self) -> str:
        return self.name


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True)
    business = models.ForeignKey(
        "business.Business",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="users",
    )
    role = models.ForeignKey(
        Role,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="users",
    )

    class Meta:
        db_table = "users_user"
        ordering = ["username"]

    def __str__(self) -> str:
        return self.get_full_name() or self.username
