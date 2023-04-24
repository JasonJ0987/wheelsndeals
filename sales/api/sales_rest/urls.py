from django.urls import path
from .views import api_salespeople, api_salesperson


urlpatterns = [
    path("salespeople/", api_salespeople, name="salespeople"),
    path("salespeople/<int:id>/", api_salesperson, name="delete")
]
