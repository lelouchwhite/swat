from django.db import models

# Create your models here.
from django import forms

from leaflet.forms.fields import PointField


class WeatherStationForm(forms.ModelForm):
    geom = PointField()

    class Meta:
        model = WeatherStation
        fields = ('name', 'geom')
