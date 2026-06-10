from django.contrib import admin

from .models import Business, Branch


@admin.register(Business)
class BusinessAdmin(admin.ModelAdmin):
    list_display = ("name", "industry", "country", "currency", "is_active", "created_at")
    list_filter = ("is_active", "country", "created_at")
    search_fields = ("name", "registration_no", "tax_pin")
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        ("Basic Information", {
            "fields": ("name", "industry", "country", "currency")
        }),
        ("Registration Details", {
            "fields": ("registration_no", "tax_pin")
        }),
        ("Status", {
            "fields": ("is_active",)
        }),
        ("Timestamps", {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",)
        }),
    )


@admin.register(Branch)
class BranchAdmin(admin.ModelAdmin):
    list_display = ("name", "business", "location", "is_active", "created_at")
    list_filter = ("business", "is_active", "created_at")
    search_fields = ("name", "location", "phone")
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        ("Basic Information", {
            "fields": ("business", "name", "location")
        }),
        ("Contact Information", {
            "fields": ("phone",)
        }),
        ("Status", {
            "fields": ("is_active",)
        }),
        ("Timestamps", {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",)
        }),
    )
