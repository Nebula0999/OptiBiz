from django.db import models

from apps.core.models import TimestampedModel


class Inventory(TimestampedModel):
    business = models.ForeignKey("business.Business", on_delete=models.CASCADE, related_name="inventory_items")
    product = models.ForeignKey("products.Product", on_delete=models.CASCADE, related_name="inventory_records")
    branch = models.ForeignKey("business.Branch", on_delete=models.CASCADE, related_name="inventory_items")
    quantity_available = models.DecimalField(max_digits=14, decimal_places=2, default=0)
    reorder_level = models.DecimalField(max_digits=14, decimal_places=2, default=0)

    class Meta:
        db_table = "inventory_inventory"
        ordering = ["product__name"]
        constraints = [models.UniqueConstraint(fields=["business", "product", "branch"], name="unique_inventory_per_branch")]

    def __str__(self) -> str:
        return f"{self.product.name} @ {self.branch.name}"


class StockMovement(TimestampedModel):
    class MovementType(models.TextChoices):
        IN = "in", "In"
        OUT = "out", "Out"
        TRANSFER = "transfer", "Transfer"

    business = models.ForeignKey("business.Business", on_delete=models.CASCADE, related_name="stock_movements")
    product = models.ForeignKey("products.Product", on_delete=models.CASCADE, related_name="stock_movements")
    source_branch = models.ForeignKey(
        "business.Branch",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="stock_movements_out",
    )
    destination_branch = models.ForeignKey(
        "business.Branch",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="stock_movements_in",
    )
    movement_type = models.CharField(max_length=20, choices=MovementType.choices)
    quantity = models.DecimalField(max_digits=14, decimal_places=2)
    created_by = models.ForeignKey("users.User", on_delete=models.SET_NULL, null=True, blank=True, related_name="stock_movements")
    notes = models.CharField(max_length=255, blank=True)

    class Meta:
        db_table = "inventory_stockmovement"
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.product.name} {self.movement_type} {self.quantity}"
