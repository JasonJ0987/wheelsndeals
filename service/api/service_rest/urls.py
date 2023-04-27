from django.urls import path
from .views import (
    api_list_technician,
    api_technician,
    api_list_automobileVO,
    api_list_appointment,
    api_appointment,
    api_appointment_cancel,
    api_appointment_finish,
)

urlpatterns = [
    path("technicians/", api_list_technician, name="api_list_technician"),
    path("technicians/<int:pk>", api_technician, name="api_technician"),
    path("appointments/", api_list_appointment, name="api_list_appointment"),
    path("appointments/<int:pk>", api_appointment, name="api_appointment"),
    path("appointments/<int:pk>/cancel", api_appointment_cancel, name="api_appointment_cancel"),
    path("appointments/<int:pk>/finish", api_appointment_finish, name="api_appointment_finish"),
    path("automobiles_vo/", api_list_automobileVO, name="api_list_automobileVO"),
]
