from rest_framework import permissions, viewsets

from apps.business.models import Branch, Business
from apps.business.serializers import BranchSerializer, BusinessSerializer
from apps.core.views import BusinessScopedModelViewSet


class BusinessViewSet(viewsets.ModelViewSet):
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return self.queryset
        if getattr(self.request.user, "business_id", None):
            return self.queryset.filter(pk=self.request.user.business_id)
        return self.queryset.none()

    def perform_create(self, serializer):
        business = serializer.save()
        if getattr(self.request.user, "business_id", None) is None:
            self.request.user.business = business
            self.request.user.save(update_fields=["business"])


class BranchViewSet(BusinessScopedModelViewSet):
    queryset = Branch.objects.select_related("business").all()
    serializer_class = BranchSerializer
