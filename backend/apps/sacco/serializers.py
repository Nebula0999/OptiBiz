from rest_framework import serializers

from apps.sacco.models import Contribution, Loan, LoanRepayment, SACCOMember


class SACCOMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = SACCOMember
        fields = ["id", "business", "name", "phone", "email", "membership_no", "join_date", "status", "created_at", "updated_at"]
        read_only_fields = ["id", "business", "created_at", "updated_at"]


class ContributionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contribution
        fields = ["id", "member", "business", "amount", "date", "payment_method", "notes", "created_at", "updated_at"]
        read_only_fields = ["id", "business", "created_at", "updated_at"]


class LoanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = ["id", "member", "business", "amount", "interest_rate", "disbursement_date", "due_date", "status", "created_at", "updated_at"]
        read_only_fields = ["id", "business", "created_at", "updated_at"]


class LoanRepaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanRepayment
        fields = ["id", "business", "loan", "amount_paid", "payment_date", "payment_method", "notes", "created_at", "updated_at"]
        read_only_fields = ["id", "business", "created_at", "updated_at"]
