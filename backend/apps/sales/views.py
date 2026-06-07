from apps.core.views import BusinessScopedModelViewSet
from apps.sales.models import Payment, Sale, SaleItem
from apps.sales.serializers import PaymentSerializer, SaleItemSerializer, SaleSerializer


class SaleViewSet(BusinessScopedModelViewSet):
    queryset = Sale.objects.select_related("business", "branch", "customer", "created_by").all()
    serializer_class = SaleSerializer

    def perform_create(self, serializer):
        serializer.save(business=self._get_user_business(), created_by=self.request.user)


class SaleItemViewSet(BusinessScopedModelViewSet):
    queryset = SaleItem.objects.select_related("business", "sale", "product").all()
    serializer_class = SaleItemSerializer


class PaymentViewSet(BusinessScopedModelViewSet):
    queryset = Payment.objects.select_related("business", "sale").all()
    serializer_class = PaymentSerializer

    def perform_create(self, serializer):
        serializer.save(business=self._get_user_business())
