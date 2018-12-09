"""
Django settings for djreact project.

Generated by 'django-admin startproject' using Django 2.1.4.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.1/ref/settings/
"""

import os
import django_heroku
from django.core.exceptions import ImproperlyConfigured


def get_env_variables(var_name, default_value=None):
    try:
        return os.environ[var_name]
    except KeyError:
        if default_value is None:
            error_msg = "Set the {} environment variable".format(var_name)
            raise ImproperlyConfigured(error_msg)
        else:
            return default_value


# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/


# Si il existe une variable d'env SECRET_KEY, alors récuprèe la valeur, sinon elle vaut la valeur par défaut
# en prod dans heroku on a définit la SECRET_KEY pour la prod

SECRET_KEY = get_env_variables(
    'SECRET_KEY', '%-f#0o)hycf&z(*m6y(ki76t+tix&ast+)hr7-(%c^#b0bnxv7')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

#ALLOWED_HOSTS = ['ipl-pfe.herokuapp.com']
ALLOWED_HOSTS = ['ipl-pfe.herokuapp.com']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    #'allauth.socialaccount',
    'corsheaders',
    'rest_auth',
    'rest_auth.registration',
    
    'rest_framework.authtoken',
    'rest_framework',
    
    'music', # add the music
    'authentication',
    
]
SITE_ID = 1

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware'


]

ROOT_URLCONF = 'djreact.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'build')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'djreact.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'nikbuwyf', #'rjngajvc',
        'USER': 'nikbuwyf', #'rjngajvc',
        'PASSWORD': 'Ig4g8TS97rQzRyn7ukACXs3NbQCQMnjb' ,#'cmpfS2gMwBxa16eo1K8uT1IDWlLG8EVy',
        'HOST': 'manny.db.elephantsql.com',
        'PORT': '5432'
    }
}


# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/

LANGUAGE_CODE = 'fr-fr'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.1/howto/static-files/


STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATIC_URL = '/static/'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


# Extra places for collectstatic to find static files.
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'build/static'),
)

REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    ]
}

CORS_ORIGIN_ALLOW_ALL = True



AUTHENTICATION_BACKENDS = (

    # Needed to login by username in Django admin, regardless of `allauth`
    'django.contrib.auth.backends.ModelBackend',

    # `allauth` specific authentication methods, such as login by e-mail / allows login with email
    'allauth.account.auth_backends.AuthenticationBackend'

)

 # à changer suivant la manière dont on veux se connecter (juste login ou aussi avec email)

ACCOUNT_AUTHENTICATION_METHOD = 'username_email' # pareil 1.23 attention mettre withRouter

AUTH_USER_MODEL='authentication.Users'
# Activate Django-Heroku.
django_heroku.settings(locals())
