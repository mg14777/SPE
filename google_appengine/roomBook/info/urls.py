from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^([0-9]+)/$', views.index, name ='index'),
    url(r'^([0-9]+)/start/$', views.startOfDayAjax, name = "initialise"),
]