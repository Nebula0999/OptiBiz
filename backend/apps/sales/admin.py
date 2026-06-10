from django.contrib import admin

from .models import Sale, SaleItem, Payment


@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = ("id", "business", "branch", "customer", "total_amount", "payment_method", "sale_date", "created_by")
    list_filter = ("business", "branch", "payment_method", "sale_date", "created_at")
    search_fields = ("customer__name", "created_by__username")
    readonly_fields = ("created_at", "updated_at", "sale_date")
    fieldsets = (
        ("Basic Information", {
            "fields": ("business", "branch", "customer")
        }),
        ("Sale Details", {
            "fields": ("total_amount", "payment_method", "sale_date")
        }),
        ("Additional Information", {
            "fields": ("created_by",)
        }),
        ("Timestamps", {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",)
        }),
    )


@admin.register(SaleItem)
class SaleItemAdmin(admin.ModelAdmin):
    list_display = ("product", "sale", "quantity", "unit_price", "subtotal", "created_at")
    list_filter = ("business", "created_at")
    search_fields = ("product__name", "sale__id")
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        ("Basic Information", {
            "fields": ("business", "sale", "product")
        }),
        ("Item Details", {
            "fields": ("quantity", "unit_price", "subtotal")
        }),
        ("Timestamps", {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",)
        }),
    )


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ("sale", "business", "amount", "method", "reference_code", "created_at")
    list_filter = ("business", "method", "created_at")
    search_fields = ("sale__id", "reference_code")
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        ("Basic Information", {
            "fields": ("business", "sale", "amount")
        }),
        ("Payment Details", {
            "fields": ("method", "reference_code")
        }),
        ("Timestamps", {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",)
        }),
    )
