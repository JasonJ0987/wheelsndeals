from django.shortcuts import render

from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import Salesperson, Customer, Sale, AutomobileVO
from django.db import IntegrityError


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "sold"]


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
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
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
            {"salespeople": salesperson},
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
        salesperson = Salesperson.objects.get(employee_id=id)
        salesperson.delete()
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False,
        )
    except Salesperson.DoesNotExist:
        return JsonResponse({"message": "Person does not exist"}, status=404)


@require_http_methods(["GET", "POST"])
def api_customers(request):
    """
    RESTful API handler for customers

    GET:
    Returns list of customers
    Expect a return list of customers
    {
        "customer": [
                {
                    "first_name": fn,
                    "last_name": ln,
                    "address": address,
                    "phone_number": pn
                }
            ]
    }

    POST:
    Creates new customer
    Expect return of details of new customer
    input:
    {
        "first_name": fn,
        "last_name": ln,
        "address": address,
        "phone_number": pn
    }
    output:
    {
        "first_name": fn,
        "last_name": ln,
        "address": address,
        "phone_number": pn
    }

    """
    if request.method == "GET":
        customer = Customer.objects.all()
        return JsonResponse(
            {"customers": customer},
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
    Deletes a customer
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
        return JsonResponse({"message": "Customer does not exist"}, status=404)


@require_http_methods(["GET", "POST"])
def api_sales(request, vin=None):
    """
    RESTful API handler for customers

    GET:
    Returns list of customers
    Expect a return list of customers
    {
        "sales": [
            {
                "id": id,
                "automobile": {
                    "vin": vin,
                    "sold": boolean
                },
                "salesperson": {
                    "id": spid,
                    "first_name": fn,
                    "last_name": ln,
                    "employee_id": eid
                },
                "customer": {
                    "id": cid,
                    "first_name": fn,
                    "last_name": ln,
                    "address": addy,
                    "phone_number": #
                },
                "price": price
            }
        ]
    }

    POST:
    Creates new customer
    Expect return of details of new customer
    input:
    {
        "automobile": vin,
        "salesperson": eid,
        "customer": cid,
        "price": price
    }
    output:
    {
        "id": id,
        "automobile": {
            "vin": vin,
            "sold": true
        },
        "salesperson": {
            "id": spid,
            "first_name": fn,
            "last_name": ln,
            "employee_id": eid
        },
        "customer": {
            "id": cid,
            "first_name": fn,
            "last_name": ln,
            "address": addy,
            "phone_number": #
        },
        "price": price
    }

    Upon a creation of a sale, the sold value should become true
    If the sale already exists, then it will not be made again
    """
    if request.method == "GET":
        if vin == None:
            sale = Sale.objects.all()
        else:
            sale = Sale.objects.get(vin=vin)
        return JsonResponse(
            {"sales": sale},
            encoder=SaleEncoder,
        )
    else: #POST
        content = json.loads(request.body)
        try:
            autoVO = AutomobileVO.objects.get(vin=content["automobile"])
            salesperson = Salesperson.objects.get(employee_id=content["salesperson"])
            customer = Customer.objects.get(id=content["customer"])
            content["automobile"] = autoVO
            content["salesperson"] = salesperson
            content["customer"] = customer

        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "VIN not found"},
                status=404,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Employee not found"},
                status=404,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer not found"},
                status=404,
            )

        if autoVO.sold == True:
            return JsonResponse(
                {"message": "This sale has already been completed"}, status=400,
            )

        autoVO.sold = True
        autoVO.save()
        sale = Sale.objects.create(**content)

        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def api_sale(request, id):
    """

    """
    try:
        sale = Sale.objects.get(id=id)
        sale.delete()
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
        )
    except Sale.DoesNotExist:
        return JsonResponse({"message": "Sale does not exist"}, status=404)
