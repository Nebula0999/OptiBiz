from rest_framework import viewsets, permissions
from apps.core.views import BusinessScopedModelViewSet
from apps.products.models import Category, Product
from apps.products.serializers import CategorySerializer, ProductSerializer


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]


class ProductViewSet(BusinessScopedModelViewSet):
    queryset = Product.objects.select_related("business", "category").all()
    serializer_class = ProductSerializer
