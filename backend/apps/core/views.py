from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum, Count, Q
from datetime import timedelta
from django.utils import timezone


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


class DashboardViewSet(viewsets.ViewSet):
    """Dashboard statistics and analytics endpoints."""
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get dashboard statistics for the user's business."""
        from apps.sales.models import Sale
        from apps.expenses.models import Expense
        from apps.inventory.models import Inventory
        from apps.customers.models import Customer
        
        user_business = request.user.business
        if not user_business:
            return Response({
                'total_revenue': 0,
                'total_expenses': 0,
                'profit': 0,
                'low_stock_items': 0,
                'active_customers': 0,
            })
        
        # Calculate revenue from sales this month
        today = timezone.now()
        first_day = today.replace(day=1)
        sales = Sale.objects.filter(business=user_business, created_at__gte=first_day)
        total_revenue = sales.aggregate(Sum('total_amount'))['total_amount__sum'] or 0
        
        # Calculate expenses this month
        expenses = Expense.objects.filter(business=user_business, date__gte=first_day)
        total_expenses = expenses.aggregate(Sum('amount'))['amount__sum'] or 0
        
        # Calculate profit
        profit = total_revenue - total_expenses
        
        # Count low stock items
        low_stock_items = Inventory.objects.filter(
            business=user_business,
            quantity__lte=10
        ).count()
        
        # Count active customers
        active_customers = Customer.objects.filter(
            business=user_business,
            is_active=True
        ).count()
        
        return Response({
            'total_revenue': float(total_revenue),
            'total_expenses': float(total_expenses),
            'profit': float(profit),
            'low_stock_items': low_stock_items,
            'active_customers': active_customers,
        })

    @action(detail=False, methods=['get'])
    def recent_sales(self, request):
        """Get recent sales for the user's business."""
        from apps.sales.models import Sale
        from apps.sales.serializers import SaleSerializer
        
        user_business = request.user.business
        if not user_business:
            return Response({'results': []})
        
        limit = request.query_params.get('limit', 10)
        try:
            limit = int(limit)
        except (ValueError, TypeError):
            limit = 10
        
        sales = Sale.objects.filter(business=user_business).order_by('-created_at')[:limit]
        serializer = SaleSerializer(sales, many=True)
        
        return Response({'results': serializer.data})

    @action(detail=False, methods=['get'])
    def low_stock_alerts(self, request):
        """Get low stock inventory alerts."""
        from apps.inventory.models import Inventory
        from apps.inventory.serializers import InventorySerializer
        
        user_business = request.user.business
        if not user_business:
            return Response({'results': []})
        
        low_stock = Inventory.objects.filter(
            business=user_business,
            quantity__lte=10
        ).order_by('quantity')
        
        serializer = InventorySerializer(low_stock, many=True)
        
        return Response({'results': serializer.data})
