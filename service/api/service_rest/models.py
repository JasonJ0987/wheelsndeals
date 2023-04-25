from django.db import models
from django.urls import reverse

class Technician(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return f"{self.employee_id}: {self.first_name} {self.last_name}"

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.vin

class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.TextField()
    status = models.CharField(max_length=200)
    customer = models.CharField(max_length=200)
    vin = models.CharField(max_length=200)

    technician = models.ForeignKey(
        "Technician",
        related_name="appointments",
        on_delete=models.CASCADE,
    )
    def __str__(self):
        return f"{self.vin} {self.date_time}"

    def cancel_appointment(self):
        self.status = "canceled"
        self.save()

    def finish_appointment(self):
        self.status = "finished"
        self.save()

    @classmethod
    def create(cls, **kwargs):
        kwargs["status"] = "created"
        appointment = cls(**kwargs)
        appointment.save()
        return appointment
