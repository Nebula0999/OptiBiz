from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import Role, User


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name", "description")
    readonly_fields = ("id",)
    fieldsets = (
        ("Basic Information", {
            "fields": ("id", "name", "description")
        }),
        ("Permissions", {
            "fields": ("permissions",)
        }),
    )


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ("username", "email", "get_full_name", "business", "role", "is_active", "is_staff")
    list_filter = ("business", "role", "is_active", "is_staff", "date_joined")
    search_fields = ("username", "email", "first_name", "last_name")
    readonly_fields = ("id", "date_joined", "last_login")
    
    fieldsets = (
        ("Authentication", {
            "fields": ("id", "username", "password")
        }),
        ("Personal Information", {
            "fields": ("first_name", "last_name", "email", "phone")
        }),
        ("Business Information", {
            "fields": ("business", "role")
        }),
        ("Permissions", {
            "fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")
        }),
        ("Important dates", {
            "fields": ("date_joined", "last_login"),
            "classes": ("collapse",)
        }),
    )
    
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("username", "email", "password1", "password2"),
        }),
    )
