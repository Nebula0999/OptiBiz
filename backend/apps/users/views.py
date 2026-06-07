from django.contrib.auth import get_user_model
from rest_framework import permissions, viewsets

from apps.core.views import BusinessScopedModelViewSet
from apps.users.models import Role
from apps.users.serializers import RoleSerializer, UserSerializer


User = get_user_model()


class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [permissions.IsAuthenticated]


class UserViewSet(BusinessScopedModelViewSet):
    queryset = User.objects.select_related("business", "role").all()
    serializer_class = UserSerializer
