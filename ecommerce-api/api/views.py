from rest_framework import status
from rest_framework import viewsets
from rest_framework.parsers import FormParser
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response

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
    parser_classes = [MultiPartParser, FormParser]

    def create(self, request, *args, **kwargs):
        options_data = []
        for i in range(len(request.POST) // 3):  # 3 is the nunber of fields per option
            option = {
                "name": request.POST.get(f"option[{i}][name]"),
                "price": request.POST.get(f"option[{i}][price]"),
                "part": request.POST.get(f"option[{i}][part]"),
                "image": request.FILES.get(f"option[{i}][image]"),
            }
            options_data.append(option)
        serializer = self.get_serializer(data=options_data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(data=serializer.data, status=status.HTTP_201_CREATED)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderSerializer


class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = models.OrderItem.objects.all()
    serializer_class = serializers.OrderItemSerializer
