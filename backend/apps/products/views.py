from apps.core.views import BusinessScopedModelViewSet
from apps.products.models import Category, Product
from apps.products.serializers import CategorySerializer, ProductSerializer


class CategoryViewSet(BusinessScopedModelViewSet):
    queryset = Category.objects.select_related("business").all()
    serializer_class = CategorySerializer


class ProductViewSet(BusinessScopedModelViewSet):
    queryset = Product.objects.select_related("business", "category").all()
    serializer_class = ProductSerializer
