from rest_framework import serializers

from apps.products.models import Category, Product


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "business", "name", "description", "created_at", "updated_at"]
        read_only_fields = ["id", "business", "created_at", "updated_at"]


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            "id",
            "business",
            "category",
            "name",
            "sku",
            "buying_price",
            "selling_price",
            "unit",
            "reorder_level",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "business", "created_at", "updated_at"]
