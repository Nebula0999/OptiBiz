from rest_framework import serializers

from apps.expenses.models import Expense


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ["id", "business", "category", "amount", "description", "expense_date", "created_by", "created_at", "updated_at"]
        read_only_fields = ["id", "business", "created_by", "created_at", "updated_at"]
