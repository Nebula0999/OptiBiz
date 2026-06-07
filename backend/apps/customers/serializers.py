from rest_framework import serializers

from apps.customers.models import Customer


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ["id", "business", "name", "phone", "email", "balance", "loyalty_points", "created_at", "updated_at"]
        read_only_fields = ["id", "business", "created_at", "updated_at"]
