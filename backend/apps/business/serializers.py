from rest_framework import serializers

from apps.business.models import Branch, Business


class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = [
            "id",
            "name",
            "industry",
            "registration_no",
            "tax_pin",
            "country",
            "currency",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = [
            "id",
            "business",
            "name",
            "location",
            "phone",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "business", "created_at", "updated_at"]
