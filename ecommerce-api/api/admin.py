from django.contrib import admin

from . import models

admin.register(models.Category)
admin.register(models.Product)
admin.register(models.Part)
admin.register(models.Option)
admin.register(models.Order)
admin.register(models.OrderItem)
admin.register(models.ProhibitedCombination)
admin.register(models.CustomPrice)
