from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated


class BusinessScopedModelViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    business_field = "business"

    def _get_user_business(self):
        user_business = getattr(self.request.user, "business", None)
        if self.request.user.is_superuser:
            return user_business
        if user_business is None:
            raise ValidationError({self.business_field: "User is not attached to a business."})
        return user_business

    def get_queryset(self):
        queryset = super().get_queryset()
        user_business = getattr(self.request.user, "business", None)
        if self.request.user.is_superuser:
            return queryset
        if user_business is None:
            return queryset.none()
        return queryset.filter(**{self.business_field: user_business})

    def perform_create(self, serializer):
        user_business = self._get_user_business()
        if self.business_field in serializer.fields:
            serializer.save(**{self.business_field: user_business})
            return
        serializer.save()
