from django.contrib.auth import get_user_model
from django.db import transaction
from django.utils.text import slugify
from rest_framework import serializers

from apps.business.models import Business
from apps.users.models import Role


User = get_user_model()


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ["id", "name", "description", "permissions"]
        read_only_fields = ["id"]


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False, allow_blank=False)
    role = serializers.StringRelatedField()

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "password",
            "phone",
            "business",
            "role",
            "is_active",
            "is_staff",
        ]
        read_only_fields = ["id"]

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        user = User(**validated_data)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        for field, value in validated_data.items():
            setattr(instance, field, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance


class UserRegistrationSerializer(UserSerializer):
    password = serializers.CharField(write_only=True, required=True, allow_blank=False)
    username = serializers.CharField(required=False, allow_blank=True)
    business_name = serializers.CharField(write_only=True, required=True, allow_blank=False)
    industry = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + ["business_name", "industry"]
        read_only_fields = ["id", "business", "role", "is_active", "is_staff"]

    def validate(self, attrs):
        attrs = super().validate(attrs)
        email = attrs.get("email")
        provided_username = attrs.get("username")
        username = provided_username or (email.split("@")[0] if email else "")

        if not username:
            raise serializers.ValidationError({"username": "Username or email is required."})
        username = slugify(username).replace("-", "_") or "user"

        if provided_username and User.objects.filter(username=username).exists():
            raise serializers.ValidationError({"username": "A user with this username already exists."})
        if not provided_username:
            base_username = username
            suffix = 1
            while User.objects.filter(username=username).exists():
                suffix += 1
                username = f"{base_username}_{suffix}"
        if email and User.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "A user with this email already exists."})
        if Business.objects.filter(name=attrs["business_name"]).exists():
            raise serializers.ValidationError({"business_name": "A business with this name already exists."})

        attrs["username"] = username
        return attrs

    @transaction.atomic
    def create(self, validated_data):
        business_name = validated_data.pop("business_name")
        industry = validated_data.pop("industry", "")
        business = Business.objects.create(name=business_name, industry=industry)
        validated_data["business"] = business
        return super().create(validated_data)
