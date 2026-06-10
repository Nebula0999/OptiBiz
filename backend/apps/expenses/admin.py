from django.contrib import admin

from .models import Expense


@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ("category", "business", "amount", "expense_date", "created_by", "created_at")
    list_filter = ("business", "category", "expense_date", "created_at")
    search_fields = ("category", "description", "created_by__username")
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        ("Basic Information", {
            "fields": ("business", "category", "amount")
        }),
        ("Details", {
            "fields": ("expense_date", "description", "created_by")
        }),
        ("Timestamps", {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",)
        }),
    )
