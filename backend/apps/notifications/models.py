from django.db import models
from django.contrib.auth import get_user_model
from apps.business.models import Business

User = get_user_model()


class Notification(models.Model):
    """User notifications for business events."""
    
    NOTIFICATION_TYPES = (
        ('low_stock', 'Low Stock Alert'),
        ('sale', 'Sale Created'),
        ('expense', 'Expense Added'),
        ('customer', 'New Customer'),
        ('payment', 'Payment Received'),
        ('system', 'System Message'),
    )
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    business = models.ForeignKey(Business, on_delete=models.CASCADE, related_name='notifications')
    
    title = models.CharField(max_length=200)
    message = models.TextField()
    notification_type = models.CharField(max_length=20, choices=NOTIFICATION_TYPES, default='system')
    
    is_read = models.BooleanField(default=False)
    
    related_object_id = models.PositiveIntegerField(null=True, blank=True)
    related_object_type = models.CharField(max_length=50, null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Notifications'
        indexes = [
            models.Index(fields=['user', '-created_at']),
            models.Index(fields=['user', 'is_read']),
        ]
    
    def __str__(self):
        return f"{self.title} - {self.user.email}"
