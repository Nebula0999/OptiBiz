from django.db import models

from apps.core.models import TimestampedModel


class Category(TimestampedModel):
    name = models.CharField(max_length=120, unique=True)
    description = models.CharField(max_length=255, blank=True)

    class Meta:
        db_table = "products_category"
        ordering = ["name"]

    def __str__(self) -> str:
        return self.name


class Product(TimestampedModel):
    business = models.ForeignKey("business.Business", on_delete=models.CASCADE, related_name="products")
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name="products")
    name = models.CharField(max_length=255)
    sku = models.CharField(max_length=120)
    buying_price = models.DecimalField(max_digits=14, decimal_places=2, default=0)
    selling_price = models.DecimalField(max_digits=14, decimal_places=2, default=0)
    unit = models.CharField(max_length=40, default="item")
    reorder_level = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "products_product"
        ordering = ["name"]
        constraints = [models.UniqueConstraint(fields=["business", "sku"], name="unique_product_sku_per_business")]

    def __str__(self) -> str:
        return self.name
