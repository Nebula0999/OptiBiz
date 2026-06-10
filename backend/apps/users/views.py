from django.contrib.auth import get_user_model
from rest_framework import permissions, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.backends import ModelBackend

from apps.core.views import BusinessScopedModelViewSet
from apps.users.models import Role
from apps.users.serializers import RoleSerializer, UserSerializer


User = get_user_model()


class EmailOrUsernameBackend(ModelBackend):
    """Authenticate using either username or email."""
    
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            # Try to find user by email first, then by username
            user = User.objects.get(email=username)
        except User.DoesNotExist:
            try:
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                return None
        
        if user.check_password(password) and self.user_can_authenticate(user):
            return user
        return None


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Custom token serializer that includes user info in response and accepts email or username."""
    
    username_field = 'username'
    
    def validate(self, attrs):
        # Allow authentication with email or username
        username_or_email = attrs.get(self.username_field)
        password = attrs.get('password')
        
        try:
            # Try to find user by email first, then by username
            user = User.objects.get(email=username_or_email)
        except User.DoesNotExist:
            try:
                user = User.objects.get(username=username_or_email)
            except User.DoesNotExist:
                from rest_framework_simplejwt.exceptions import AuthenticationFailed
                raise AuthenticationFailed(self.error_messages['no_active_account'], 'no_active_account')
        
        # Verify password
        if not user.check_password(password):
            from rest_framework_simplejwt.exceptions import AuthenticationFailed
            raise AuthenticationFailed(self.error_messages['no_active_account'], 'no_active_account')
        
        # Set user for parent class processing
        self.user = user
        
        # Get tokens
        refresh = self.get_token(user)
        data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
        
        # Add user info
        data["user"] = {
            "id": str(user.id),
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "phone": user.phone,
            "business": str(user.business.id) if user.business else None,
            "role": str(user.role.id) if user.role else None,
            "is_staff": user.is_staff,
            "is_active": user.is_active,
        }
        return data


class CustomTokenObtainPairView(TokenObtainPairView):
    """Custom login endpoint that returns user info with tokens."""

    serializer_class = CustomTokenObtainPairSerializer


class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [permissions.IsAuthenticated]


class UserViewSet(BusinessScopedModelViewSet):
    queryset = User.objects.select_related("business", "role").all()
    serializer_class = UserSerializer

    @action(detail=False, methods=["post"], permission_classes=[permissions.AllowAny])
    def register(self, request):
        """Register a new user and return tokens."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Generate tokens for the new user
        token_serializer = CustomTokenObtainPairSerializer(
            data={"username": user.username, "password": request.data.get("password")}
        )
        if token_serializer.is_valid():
            return Response(token_serializer.validated_data, status=status.HTTP_201_CREATED)

        return Response(
            {"detail": "User created but token generation failed"},
            status=status.HTTP_201_CREATED
        )
