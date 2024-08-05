# import confy
import os
#from dj_static import Cling, MediaCling
#from whitenoise.django import DjangoWhiteNoise
from django.core.wsgi import get_wsgi_application
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# confy.read_environment_file(BASE_DIR+"/.env")
os.environ.setdefault("BASE_DIR", BASE_DIR)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'parkstay.settings')
application = get_wsgi_application()

