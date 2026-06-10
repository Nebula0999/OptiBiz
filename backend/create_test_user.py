#!/usr/bin/env python
"""Create a test user for API testing."""

import os
import django
from pathlib import Path

# Setup Django
BASE_DIR = Path(__file__).resolve().parent
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.users.models import User

# Create test user
try:
    user = User.objects.create_user(
        username='testuser',
        email='test@optibiz.com',
        password='TestPass123',
        first_name='Test',
        last_name='User',
        phone='+254700000000'
    )
    print("✅ Test user created successfully!")
    print(f"   Email: {user.email}")
    print(f"   Username: {user.username}")
    print(f"   ID: {user.id}")
except Exception as e:
    print(f"❌ Error creating user: {e}")
