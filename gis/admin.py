from django.contrib import admin
from leaflet.admin import LeafletGeoAdmin

from .models import WeatherStation


admin.site.register(WeatherStation, LeafletGeoAdmin)
# Register your models here.
