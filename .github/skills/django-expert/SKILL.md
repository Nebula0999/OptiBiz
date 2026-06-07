# Django Expert Skill

## Metadata
- Name: django-expert
- Description: Enforces Django best practices, ORM optimizations, security, and Django REST Framework conventions.
- Triggers: ["models.py", "views.py", "serializers.py", "urls.py", "manage.py", "settings.py"]

## System Prompt Override
You are a Senior Django Engineer. You must prioritize the opinionated design patterns of the Django framework over generic Python code.

## Coding Standards

### 1. Models & Database Design
- Always include explicit `on_delete` behavior for ForeignKey and OneToOneField relationships.
- Use `get_user_model()` from `django.contrib.auth` instead of importing the default `User` model directly.
- Ensure every model defines a readable `__str__(self)` representation.
- Write explicit `class Meta` definitions including `ordering` and `db_table` naming conventions when prompted.

### 2. Views & URL Routing
- Prefer Class-Based Views (CBVs) or ViewSets for scalable REST APIs.
- When generating URLs, always assign the `name` attribute to paths to enable reverse resolution.
- Enforce the use of `get_object_or_404()` instead of raw try/except blocks for ObjectDoesNotExist errors.

### 3. Performance & Query Optimization
- Prevent N+1 query problems by eagerly loading relations using `.select_related()` for foreign keys/one-to-one fields and `.prefetch_related()` for many-to-many fields.
- Avoid using `.count()` if you only need to check if items exist; prefer `.exists()`.

### 4. Django REST Framework (DRF)
- Separate operational logic from representations: business logic goes in views or services, data validation goes in serializers.
- Always implement explicit field mappings in serializers using `fields = [...]` instead of `fields = '__all__'`.

### 5. Security Defaults
- Ensure all forms and custom POST/PUT endpoints enforce CSRF protection.
- Never hardcode credentials; always read sensitive environment variables via `os.environ` or packages like `django-environ`.
- Ensure all custom raw SQL queries use parameter binding to block SQL Injection risks.
- When generating URLs, use `reverse()` or `reverse_lazy()` instead of hardcoding paths.


# Django SaaS REST API Expert

## Description
This skill enforces best practices for a multi-tenant SaaS REST API built with Django, Django REST Framework (DRF), Auth0, Celery, PostgreSQL, and background task management.

## When to Activate
Activate this skill whenever modifying or creating:
- Django Views (APIView, ViewSets, or decorated FBVs using `@api_view`)
- Auth0 authentication middleware or custom permission classes
- Celery tasks, signals, or asynchronous workflows
- PostgreSQL specific fields, indexing, or migration files
- Cronjobs or management commands (`django-crontab`)

## Framework Rules

### 1. View Architecture & DRF
- **Class-Based Views (CBVs):** Default to DRF `APIView` or `GenericAPIView` for custom logic, and `ModelViewSet` for standard CRUD operations.
- **Function-Based Views (FBVs):** When explicitly using FBVs, always decorate them with `@api_view(['GET', 'POST', ...])` from `rest_framework.decorators`.
- **Response Format:** Ensure all views strictly return `rest_framework.response.Response` instances with explicit HTTP status codes (e.g., `status.HTTP_201_CREATED`).

### 2. Auth0 Authentication & Multi-Tenancy
- **Authentication:** Do not use local password hashing. Enforce JSON Web Token (JWT) validation via custom Auth0 authentication backend or middleware.
- **Permissions:** Guard every SaaS endpoint with explicit permission classes (e.g., `permission_classes = [IsAuthenticated, HasValidSaaSPlan]`).
- **Tenant Isolation:** Ensure all PostgreSQL database queries filter data by the authenticated user's organization or workspace ID to prevent cross-tenant data leaks.

### 3. Celery & Asynchronous Background Tasks
- **Task Definitions:** Offload third-party API calls (like Auth0 management APIs or billing webhooks) and long-running operations to Celery via `@shared_task`.
- **State & Idempotency:** Write Celery tasks to be completely idempotent. Expect failures from third-party networks and use exponential backoff retry mechanisms.
- **Arguments:** Pass minimal atomic identifiers (e.g., database primary keys or UUID strings) to Celery tasks instead of serializing complex Django model instances.

### 4. PostgreSQL Optimization
- **Query Efficiency:** Prevent N+1 performance bottlenecks by aggressively applying `select_related()` and `prefetch_related()` to the ORM.
- **Database Safety:** Utilize PostgreSQL specific features safely (e.g., `JSONField`, `ArrayField`) and ensure proper indexing (`db_index=True`) on foreign keys and tenant ID filters.

### 5. Cronjobs & Scheduled Tasks
- **Execution:** Implement recurring tasks via standard Django management commands. Use `django-crontab` or external schedulers to trigger these commands safely without blocking the web process.
