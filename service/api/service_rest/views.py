from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.db import IntegrityError, DataError
from .models import Technician, AutomobileVO, Appointment
from .encoders import TechnicianEncoder, AutomobileVOEncoder, AppointmentEncoder
import json


@require_http_methods(["GET", "POST"])
def api_list_technician(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except IntegrityError:
            return JsonResponse(
                {"message": "Technician already exists"},
                status=400
            )


@require_http_methods(["DELETE"])
def api_technician(request, pk):
    try:
        technician = Technician.objects.get(id=pk)
        technician.delete()
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False,
        )
    except Technician.DoesNotExist:
        return JsonResponse({"message": "Technician does not exist"})


@require_http_methods(["GET"])
def api_list_automobileVO(request):
    if request.method == "GET":
        automobiles = AutomobileVO.objects.all()
        return JsonResponse(
            {"automobiles": automobiles},
            encoder=AutomobileVOEncoder,
        )


@require_http_methods(["GET", "POST"])
def api_list_appointment(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.get(employee_id=content["technician"])
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician"},
                status=400,
            )
        try:
            appointment = Appointment.create(**content)
        except DataError:
            return JsonResponse(
                {"message": "Confirm VIN is composed of 17 characters"},
                status=400
            )
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def api_appointment(request, pk):
    try:
        appointment = Appointment.objects.get(id=pk)
        appointment.delete()
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )
    except Appointment.DoesNotExist:
        return JsonResponse(
            {"message": "Appointment does not exist"},
            status=404,
        )


@require_http_methods(["PUT"])
def api_appointment_cancel(request, pk):
    try:
        appointment = Appointment.objects.get(id=pk)
    except Appointment.DoesNotExist:
        return JsonResponse(
            {"message": "Appointment does not exist"},
            status=404,
        )
    appointment.cancel_appointment()
    return JsonResponse(
        appointment,
        encoder=AppointmentEncoder,
        safe=False,
    )


@require_http_methods(["PUT"])
def api_appointment_finish(request, pk):
    try:
        appointment = Appointment.objects.get(id=pk)
    except Appointment.DoesNotExist:
        return JsonResponse(
            {"message": "Appointment does not exist"},
            status=404,
        )
    appointment.finish_appointment()
    return JsonResponse(
        appointment,
        encoder=AppointmentEncoder,
        safe=False,
    )

