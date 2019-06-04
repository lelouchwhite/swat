from django import forms

from leaflet.forms.widgets import LeafletWidget


class WeatherStationForm(forms.ModelForm):

    class Meta:
        model = WeatherStation
        fields = ('name', 'geom')
        widgets = {'geom': LeafletWidget()}