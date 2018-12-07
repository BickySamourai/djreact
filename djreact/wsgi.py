"""
WSGI config for djreact project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

# si il trouve DJANGO_SETTINGS_MODULE alors il utilise sa valeur, sinon il utilise les settings de prod_settings
# dans heroku dans config var on a une variable
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'djreact.settings')

application = get_wsgi_application()
