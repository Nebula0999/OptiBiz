from rest_framework import serializers

from apps.inventory.models import Inventory, StockMovement


class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = ["id", "business", "product", "branch", "quantity_available", "reorder_level", "created_at", "updated_at"]
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
