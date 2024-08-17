from django.contrib import admin

from . import models

admin.site.register(models.Category)
admin.site.register(models.Product)
admin.site.register(models.Part)
admin.site.register(models.Option)
admin.site.register(models.Order)
admin.site.register(models.OrderItem)
admin.site.register(models.ProhibitedCombination)
admin.site.register(models.CustomPrice)
