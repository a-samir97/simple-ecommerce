from rest_framework import status
from rest_framework import viewsets
from rest_framework.parsers import FormParser
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response

from . import models
from . import serializers
from .services import OrderService


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = models.Category.objects.all()
    serializer_class = serializers.CategorySerializer
    pagination_class = None

    def retrieve(self, request, *args, **kwargs):
        category = self.get_object()
        serializer = self.get_serializer(category)
        products_serializer = serializers.ProductSerializer(
            category.products.all(), many=True, context={"request": request}
        )
        data = {**serializer.data, "products": products_serializer.data}
        return Response(data=data, status=status.HTTP_200_OK)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductSerializer

    def retrieve(self, request, *args, **kwargs):
        product = self.get_object()
        serializer = self.get_serializer(product)
        parts_serializer = serializers.RetrievePartOptionSerializer(
            product.parts, many=True, context={"request": request}
        )
        data = {
            **serializer.data,
            "parts": parts_serializer.data,
        }
        return Response(data=data, status=status.HTTP_200_OK)


class PartViewSet(viewsets.ModelViewSet):
    queryset = models.Part.objects.all()
    serializer_class = serializers.PartSerializer

    def get_serializer(self, *args, **kwargs):
        # to handle bulk create parts
        if isinstance(kwargs.get("data", {}), list):
            kwargs["many"] = True
        return super().get_serializer(*args, **kwargs)


class OptionViewSet(viewsets.ModelViewSet):
    queryset = models.Option.objects.all()
    serializer_class = serializers.OptionSerializer
    parser_classes = [MultiPartParser, FormParser]

    def create(self, request, *args, **kwargs):
        # check
        if not request.POST or not request.FILES:
            return Response(data={""}, status=status.HTTP_400_BAD_REQUEST)

        options_data = []
        for i in range(len(request.POST) // 3):  # 3 is the nunber of fields per option
            option = {
                "name": request.POST.get(f"option[{i}][name]")
                or request.POST.get("name"),
                "price": request.POST.get(f"option[{i}][price]")
                or request.POST.get("price"),
                "part": request.POST.get(f"option[{i}][part]")
                or request.POST.get("part"),
                "image": request.FILES.get(f"option[{i}][image]")
                or request.FILES.get("image"),
            }
            options_data.append(option)
        serializer = self.get_serializer(data=options_data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(data=serializer.data, status=status.HTTP_201_CREATED)


class CustomPriceViewSet(viewsets.ModelViewSet):
    queryset = models.CustomPrice.objects.all()
    serializer_class = serializers.CustomPriceSerializer

    def get_serializer(self, *args, **kwargs):
        # to handle bulk create parts
        if isinstance(kwargs.get("data", {}), list):
            kwargs["many"] = True
        return super().get_serializer(*args, **kwargs)


class ProhibitedCombinationViewSet(viewsets.ModelViewSet):
    queryset = models.ProhibitedCombination.objects.all()
    serializer_class = serializers.ProhibitedCombinationSerializer

    def get_serializer(self, *args, **kwargs):
        # to handle bulk create parts
        if isinstance(kwargs.get("data", {}), list):
            kwargs["many"] = True
        return super().get_serializer(*args, **kwargs)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        order_service = OrderService()
        created_order = order_service.create_whole_order(data=serializer.validated_data)
        order_serializer = serializers.OrderSerializer(created_order)
        return Response(data=order_serializer.data, status=status.HTTP_201_CREATED)
