from apps.core.views import BusinessScopedModelViewSet
from apps.customers.models import Customer
from apps.customers.serializers import CustomerSerializer


class CustomerViewSet(BusinessScopedModelViewSet):
    queryset = Customer.objects.select_related("business").all()
    serializer_class = CustomerSerializer
