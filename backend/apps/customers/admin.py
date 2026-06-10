from django.contrib import admin

from .models import Customer


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ("name", "business", "phone", "email", "balance", "loyalty_points", "created_at")
    list_filter = ("business", "created_at")
    search_fields = ("name", "phone", "email")
    readonly_fields = ("created_at", "updated_at", "balance", "loyalty_points")
    fieldsets = (
        ("Basic Information", {
            "fields": ("business", "name")
        }),
        ("Contact Information", {
            "fields": ("phone", "email")
        }),
        ("Account Details", {
            "fields": ("balance", "loyalty_points")
        }),
        ("Timestamps", {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",)
        }),
    )
