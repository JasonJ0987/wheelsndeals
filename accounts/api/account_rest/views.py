# from django.shortcuts import render
# from .models import Account
# from django.db import IntegrityError
# from .encoders import AccountEncoder
# from django.http import HttpResponse, JsonResponse
# from django.views.decorators.http import require_http_methods
# import json


# def create_user(json_content):
#     try:
#         content = json.loads(json_content)
#     except json.JSONDecodeError:
#         return 400, {"message": "Bad JSON"}, None

#     required_properties = [
#         "username",
#         "email",
#         "password",
#         "first_name",
#         "last_name",
#     ]
#     missing_properties = []
#     for property in required_properties:
#         if (
#             property not in content
#             or len(content[property]) == 0
#         ):
#             missing_properties.append(property)
#     if missing_properties:
#         response_content = {
#             "message": "missing properties",
#             "properties": missing_properties,
#         }
#         return 400, response_content, None

#     try:
#         account = Account.objects.create_user(
#             username=content["username"],
#             email=content["email"],
#             password=content["password"],
#             first_name=content["first_name"],
#             last_name=content["last_name"],
#         )
#         return 200, account, account
#     except IntegrityError as e:
#         return 409, {"message": str(e)}, None
#     except ValueError as e:
#         return 400, {"message": str(e)}, None


# @require_http_methods(["GET", "POST"])
# def api_list_accounts(request):
#     if request.method == "GET":
#         accounts = Account.objects.all()
#         return JsonResponse(
#             {"accounts": accounts},
#             encoder=AccountEncoder,
#         )
#     else:
#         status_code, response_content, _ = create_user(request.body)
#         response = JsonResponse(
#             response_content,
#             encoder=AccountEncoder,
#             safe=False
#         )
#         response.status_code = status_code
#         return response


# @require_http_methods(["GET", "DELETE"])
# def api_delete_account(request, id):
#     try:
#         account = Account.objects.get(id=id)
#         account.delete()
#         return JsonResponse({"message": "Account Deleted"})
#     except Account.DoesNotExist:
#         return JsonResponse({"message": "Account does not exist"}, status=404)
