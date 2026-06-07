from django.db import models

from apps.core.models import TimestampedModel


class Customer(TimestampedModel):
    business = models.ForeignKey("business.Business", on_delete=models.CASCADE, related_name="customers")
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    balance = models.DecimalField(max_digits=14, decimal_places=2, default=0)
    loyalty_points = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = "customers_customer"
        ordering = ["name"]
        constraints = [models.UniqueConstraint(fields=["business", "name"], name="unique_customer_name_per_business")]

    def __str__(self) -> str:
        return self.name
