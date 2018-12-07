import dj_database_url
from djreact.settings import *


DEBUG = False
TEMPLATE_DEBUG = False

DATABASES['default'] = dj_database_url.config()
MIDDLEWARE+= ['whitenoise.middleware.WhiteNoiseMiddleware']
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


# Extra places for collectstatic to find static files.
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'build/static'),
)





ALLOWED_HOSTS = ['ipl-pfe.herokuapp.com']