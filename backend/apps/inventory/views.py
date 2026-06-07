from apps.core.views import BusinessScopedModelViewSet
from apps.inventory.models import Inventory, StockMovement
from apps.inventory.serializers import InventorySerializer, StockMovementSerializer


class InventoryViewSet(BusinessScopedModelViewSet):
    queryset = Inventory.objects.select_related("business", "product", "branch").all()
    serializer_class = InventorySerializer


class StockMovementViewSet(BusinessScopedModelViewSet):
    queryset = StockMovement.objects.select_related("business", "product", "source_branch", "destination_branch", "created_by").all()
    serializer_class = StockMovementSerializer

    def perform_create(self, serializer):
        serializer.save(business=self._get_user_business(), created_by=self.request.user)
