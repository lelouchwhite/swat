from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse


# Create your views here.
def index(request):
    # return HttpResponse('hello world')
    return render(request, 'index.html')


def nat(request):
    return render(request, 'nat.html')


def test(request):
    return render(request, 'area-rainfall.html')
