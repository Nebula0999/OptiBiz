from django.db import models

from apps.core.models import TimestampedModel


class Sale(TimestampedModel):
    class PaymentMethod(models.TextChoices):
        CASH = "cash", "Cash"
        MPESA = "mpesa", "M-Pesa"
        CARD = "card", "Card"
        BANK = "bank", "Bank Transfer"

    business = models.ForeignKey("business.Business", on_delete=models.CASCADE, related_name="sales")
    branch = models.ForeignKey("business.Branch", on_delete=models.SET_NULL, null=True, blank=True, related_name="sales")
    customer = models.ForeignKey("customers.Customer", on_delete=models.SET_NULL, null=True, blank=True, related_name="sales")
    total_amount = models.DecimalField(max_digits=14, decimal_places=2, default=0)
    payment_method = models.CharField(max_length=20, choices=PaymentMethod.choices)
    sale_date = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey("users.User", on_delete=models.SET_NULL, null=True, blank=True, related_name="sales")

    class Meta:
        db_table = "sales_sale"
        ordering = ["-sale_date"]

    def __str__(self) -> str:
        return f"Sale #{self.pk or 'new'}"


class SaleItem(TimestampedModel):
    business = models.ForeignKey("business.Business", on_delete=models.CASCADE, related_name="sale_items")
    sale = models.ForeignKey(Sale, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey("products.Product", on_delete=models.CASCADE, related_name="sale_items")
    quantity = models.DecimalField(max_digits=14, decimal_places=2)
    unit_price = models.DecimalField(max_digits=14, decimal_places=2)
    subtotal = models.DecimalField(max_digits=14, decimal_places=2)

    class Meta:
        db_table = "sales_saleitem"
        ordering = ["sale_id", "id"]

    def __str__(self) -> str:
        return f"{self.product.name} x {self.quantity}"


class Payment(TimestampedModel):
    business = models.ForeignKey("business.Business", on_delete=models.CASCADE, related_name="payments")
    sale = models.ForeignKey(Sale, on_delete=models.CASCADE, related_name="payments")
    amount = models.DecimalField(max_digits=14, decimal_places=2)
    method = models.CharField(max_length=20, choices=Sale.PaymentMethod.choices)
    reference_code = models.CharField(max_length=120, blank=True)
    paid_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "sales_payment"
        ordering = ["-paid_at"]

    def __str__(self) -> str:
        return f"Payment {self.amount} for sale {self.sale_id}"
