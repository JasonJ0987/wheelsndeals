from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .models import Salesperson, Customer, Sale, AutomobileVO
from .encoders import SalespersonEncoder, CustomerEncoder, SaleEncoder
from django.db import IntegrityError


@require_http_methods(["GET", "POST"])
def api_salespeople(request):
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
            return JsonResponse({"message": "This employee id already exists"}, status=400)

        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def api_salesperson(request, id):
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
            return JsonResponse({"message": "This phone number already exists"}, status=400)

        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False
        )


@require_http_methods(["DELETE"])
def api_customer(request, id):
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
