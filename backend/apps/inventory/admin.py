from django.contrib import admin

from .models import Inventory, StockMovement


@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
    list_display = ("product", "branch", "quantity_available", "reorder_level", "created_at")
    list_filter = ("business", "branch", "created_at")
    search_fields = ("product__name", "branch__name")
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        ("Basic Information", {
            "fields": ("business", "product", "branch")
        }),
        ("Inventory Details", {
            "fields": ("quantity_available", "reorder_level")
        }),
        ("Timestamps", {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",)
        }),
    )


@admin.register(StockMovement)
class StockMovementAdmin(admin.ModelAdmin):
    list_display = ("product", "movement_type", "quantity", "source_branch", "destination_branch", "created_by", "created_at")
    list_filter = ("business", "movement_type", "created_at")
    search_fields = ("product__name", "created_by__username")
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        ("Basic Information", {
            "fields": ("business", "product", "movement_type", "quantity")
        }),
        ("Branches", {
            "fields": ("source_branch", "destination_branch")
        }),
        ("Additional Details", {
            "fields": ("created_by", "notes")
        }),
        ("Timestamps", {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",)
        }),
    )
