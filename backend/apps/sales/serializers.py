from rest_framework import serializers

from apps.sales.models import Payment, Sale, SaleItem


class SaleSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source="customer.name", read_only=True)
    branch_name = serializers.CharField(source="branch.name", read_only=True)

    class Meta:
        model = Sale
        fields = [
            "id",
            "business",
            "branch",
            "branch_name",
            "customer",
            "customer_name",
            "total_amount",
            "payment_method",
            "sale_date",
            "created_by",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "business", "created_by", "sale_date", "created_at", "updated_at"]


class SaleItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = SaleItem
        fields = ["id", "business", "sale", "product", "quantity", "unit_price", "subtotal", "created_at", "updated_at"]
        read_only_fields = ["id", "business", "created_at", "updated_at"]


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ["id", "business", "sale", "amount", "method", "reference_code", "paid_at", "created_at", "updated_at"]
        read_only_fields = ["id", "business", "paid_at", "created_at", "updated_at"]
