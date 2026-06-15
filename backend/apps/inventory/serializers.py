from rest_framework import serializers

from apps.inventory.models import Inventory, StockMovement


class InventorySerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)
    branch_name = serializers.CharField(source="branch.name", read_only=True)
    current_stock = serializers.DecimalField(
        source="quantity_available",
        max_digits=14,
        decimal_places=2,
        read_only=True,
    )

    class Meta:
        model = Inventory
        fields = [
            "id",
            "business",
            "product",
            "product_name",
            "branch",
            "branch_name",
            "quantity_available",
            "current_stock",
            "reorder_level",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "business", "created_at", "updated_at"]


class StockMovementSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockMovement
        fields = [
            "id",
            "business",
            "product",
            "source_branch",
            "destination_branch",
            "movement_type",
            "quantity",
            "created_by",
            "notes",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "business", "created_by", "created_at", "updated_at"]
