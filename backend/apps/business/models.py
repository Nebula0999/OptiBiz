from django.db import models

from apps.core.models import TimestampedModel


class Business(TimestampedModel):
    name = models.CharField(max_length=255, unique=True)
    industry = models.CharField(max_length=120, blank=True)
    registration_no = models.CharField(max_length=120, blank=True)
    tax_pin = models.CharField(max_length=120, blank=True)
    country = models.CharField(max_length=80, default="Kenya")
    currency = models.CharField(max_length=10, default="KES")
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "business_business"
        ordering = ["name"]

    def __str__(self) -> str:
        return self.name


class Branch(TimestampedModel):
    business = models.ForeignKey(Business, on_delete=models.CASCADE, related_name="branches")
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "business_branch"
        ordering = ["name"]
        constraints = [
            models.UniqueConstraint(fields=["business", "name"], name="unique_branch_per_business"),
        ]

    def __str__(self) -> str:
        return f"{self.business.name} - {self.name}"
