from django.contrib import admin
from .models import AutomobileVO
# Register your models here.

@admin.register(AutomobileVO)
class AutomobileVO(admin.ModelAdmin):
    pass
