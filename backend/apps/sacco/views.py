from apps.core.views import BusinessScopedModelViewSet
from apps.sacco.models import Contribution, Loan, LoanRepayment, SACCOMember
from apps.sacco.serializers import ContributionSerializer, LoanRepaymentSerializer, LoanSerializer, SACCOMemberSerializer


class SACCOMemberViewSet(BusinessScopedModelViewSet):
    queryset = SACCOMember.objects.select_related("business").all()
    serializer_class = SACCOMemberSerializer


class ContributionViewSet(BusinessScopedModelViewSet):
    queryset = Contribution.objects.select_related("business", "member").all()
    serializer_class = ContributionSerializer


class LoanViewSet(BusinessScopedModelViewSet):
    queryset = Loan.objects.select_related("business", "member").all()
    serializer_class = LoanSerializer


class LoanRepaymentViewSet(BusinessScopedModelViewSet):
    queryset = LoanRepayment.objects.select_related("business", "loan").all()
    serializer_class = LoanRepaymentSerializer

    def perform_create(self, serializer):
        serializer.save(business=self._get_user_business())
