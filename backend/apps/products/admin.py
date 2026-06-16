from django.contrib import admin

from .models import Category, Product


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "created_at")
    list_filter = ("created_at",)
    search_fields = ("name", "description")
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        ("Basic Information", {
            "fields": ("name",)
        }),
        ("Details", {
            "fields": ("description",)
        }),
        ("Timestamps", {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",)
        }),
    )


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "business", "category", "sku", "selling_price", "is_active", "created_at")
    list_filter = ("business", "category", "is_active", "created_at")
    search_fields = ("name", "sku")
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        ("Basic Information", {
            "fields": ("business", "category", "name", "sku")
        }),
        ("Pricing", {
            "fields": ("buying_price", "selling_price")
        }),
        ("Details", {
            "fields": ("unit", "reorder_level", "is_active")
        }),
        ("Timestamps", {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",)
        }),
    )
