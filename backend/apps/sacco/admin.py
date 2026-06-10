from django.contrib import admin

from .models import SACCOMember, Contribution, Loan


@admin.register(SACCOMember)
class SACCOMemberAdmin(admin.ModelAdmin):
    list_display = ("name", "business", "membership_no", "join_date", "status", "created_at")
    list_filter = ("business", "status", "join_date", "created_at")
    search_fields = ("name", "membership_no", "phone", "email")
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        ("Basic Information", {
            "fields": ("business", "name", "membership_no")
        }),
        ("Contact Information", {
            "fields": ("phone", "email")
        }),
        ("Membership Details", {
            "fields": ("join_date", "status")
        }),
        ("Timestamps", {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",)
        }),
    )


@admin.register(Contribution)
class ContributionAdmin(admin.ModelAdmin):
    list_display = ("member", "business", "amount", "date", "payment_method", "created_at")
    list_filter = ("business", "payment_method", "date", "created_at")
    search_fields = ("member__name", "member__membership_no")
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        ("Basic Information", {
            "fields": ("business", "member", "amount")
        }),
        ("Payment Details", {
            "fields": ("date", "payment_method")
        }),
        ("Additional Information", {
            "fields": ("notes",)
        }),
        ("Timestamps", {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",)
        }),
    )


@admin.register(Loan)
class LoanAdmin(admin.ModelAdmin):
    list_display = ("member", "business", "amount", "status", "disbursement_date", "created_at")
    list_filter = ("business", "status", "created_at")
    search_fields = ("member__name", "member__membership_no")
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        ("Basic Information", {
            "fields": ("business", "member", "amount")
        }),
        ("Loan Details", {
            "fields": ("interest_rate", "disbursement_date", "repayment_date", "status")
        }),
        ("Additional Information", {
            "fields": ("notes",)
        }),
        ("Timestamps", {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",)
        }),
    )
