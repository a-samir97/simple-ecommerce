from rest_framework import viewsets

from . import models
from . import serializers


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = models.Category.objects.all()
    serializer_class = serializers.CategorySerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductSerializer


class PartViewSet(viewsets.ModelViewSet):
    queryset = models.Part.objects.all()
    serializer_class = serializers.PartSerializer

    def get_serializer(self, *args, **kwargs):
        # to handle bulk create parts
        if isinstance(kwargs.get("data", {}), list):
            kwargs["many"] = True
        return super(PartViewSet, self).get_serializer(*args, **kwargs)


class OptionViewSet(viewsets.ModelViewSet):
    queryset = models.Option.objects.all()
    serializer_class = serializers.OptionSerializer

    def get_serializer(self, *args, **kwargs):
        print(kwargs.get("data"), "\n\n\n\n")
        converted_data = list(kwargs.get("data", []))
        # to handle bulk create for options
        if len(converted_data) > 1:
            kwargs["many"] = True
        return super().get_serializer(*args, **kwargs)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderSerializer


class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = models.OrderItem.objects.all()
    serializer_class = serializers.OrderItemSerializer
