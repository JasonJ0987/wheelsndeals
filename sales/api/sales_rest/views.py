from django.shortcuts import render

from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import Salesperson, Customer, Sale, AutomobileVO
from django.db import IntegrityError


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin"]


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "first_name",
        "last_name",
        "address",
        "phone_number",
    ]


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "automobile",
        "salesperson",
        "customer",
        "price",
    ]
    encoders = {
        "automobile": AutomobileVOEncoder
    }


@require_http_methods(["GET", "POST"])
def api_salespeople(request):
    """
    RESTful API handler for salespeople

    GET:
    Returns list of salespeople
    Expect a return list of salespeople
    {
        "salesperson": [
                {
                    "first_name": fn,
                    "last_name": ln,
                    "employee_id": ei
                }
            ]
    }

    POST:
    Creates new salesperson
    Expect return of details of new salesperson
    input:
    {
        "first_name": fn,
        "last_name": ln,
        "employee_id": ei
    }
    output:
    {
        "first_name": fn,
        "last_name": ln,
        "employee_id": ei
    }

    """
    if request.method == "GET":
        salesperson = Salesperson.objects.all()
        return JsonResponse(
            {"salesperson": salesperson},
            encoder=SalespersonEncoder,
        )
    else: # POST
        content = json.loads(request.body)
        try:
            salesperson = Salesperson.objects.create(**content)
        except IntegrityError:
            return JsonResponse({"message": "This employee id already exists"})

        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False,
        )

@require_http_methods(["DELETE"])
def api_salesperson(request, id):
    """
    Deletes a salesperson
    """
    try:
        salesperson = Salesperson.objects.get(id=id)
        salesperson.delete()
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False,
        )
    except Salesperson.DoesNotExist:
        return JsonResponse({"message": "Person does not exist"})


@require_http_methods(["GET", "POST"])
def api_customers(request):
    """

    """
    if request.method == "GET":
        customer = Customer.objects.all()
        return JsonResponse(
            {"customer": customer},
            encoder=CustomerEncoder,
            safe=False,
        )
    else: #POST
        content = json.loads(request.body)
        try:
            customer = Customer.objects.create(**content)
        except IntegrityError:
            return JsonResponse({"message": "This phone number already exists"})

        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False
        )


@require_http_methods(["DELETE"])
def api_customer(request, id):
    """

    """
    try:
        customer = Customer.objects.get(id=id)
        customer.delete()
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )
    except Customer.DoesNotExist:
        return JsonResponse({"message": "Customer does not exist"})
