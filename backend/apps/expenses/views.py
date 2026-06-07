from apps.core.views import BusinessScopedModelViewSet
from apps.expenses.models import Expense
from apps.expenses.serializers import ExpenseSerializer


class ExpenseViewSet(BusinessScopedModelViewSet):
    queryset = Expense.objects.select_related("business", "created_by").all()
    serializer_class = ExpenseSerializer

    def perform_create(self, serializer):
        serializer.save(business=self._get_user_business(), created_by=self.request.user)
