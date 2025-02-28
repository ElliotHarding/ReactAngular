INSTALLED_APPS = [
    # ... other apps
    'rest_framework',
    'api',
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    # ... other middleware
    'django.middleware.common.CommonMiddleware',
    # ... other middleware
]

CORS_ALLOW_ALL_ORIGINS = True
