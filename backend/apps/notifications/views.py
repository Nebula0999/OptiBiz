from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from apps.notifications.models import Notification
from apps.notifications.serializers import NotificationSerializer
from apps.core.views import BusinessScopedModelViewSet


class NotificationViewSet(BusinessScopedModelViewSet):
    """ViewSet for notifications."""
    
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]
    business_field = 'business'
    
    def get_queryset(self):
        user = self.request.user
        # Filter notifications for the current user
        queryset = Notification.objects.filter(user=user)
        if not user.is_superuser and user.business:
            queryset = queryset.filter(business=user.business)
        return queryset.order_by('-created_at')
    
    @action(detail=False, methods=['post'])
    def mark_as_read(self, request, pk=None):
        """Mark a notification as read."""
        try:
            notification = self.get_queryset().get(pk=request.data.get('id'))
            notification.is_read = True
            notification.save()
            return Response({'status': 'notification marked as read'})
        except Notification.DoesNotExist:
            return Response(
                {'error': 'Notification not found'},
                status=status.HTTP_404_NOT_FOUND
            )
    
    @action(detail=False, methods=['post'])
    def mark_all_as_read(self, request):
        """Mark all notifications as read for the current user."""
        self.get_queryset().filter(is_read=False).update(is_read=True)
        return Response({'status': 'all notifications marked as read'})
    
    @action(detail=False, methods=['get'])
    def unread_count(self, request):
        """Get count of unread notifications."""
        count = self.get_queryset().filter(is_read=False).count()
        return Response({'unread_count': count})
