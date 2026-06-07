from rest_framework import serializers

from apps.sales.models import Payment, Sale, SaleItem


class SaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = ["id", "business", "branch", "customer", "total_amount", "payment_method", "sale_date", "created_by", "created_at", "updated_at"]
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
