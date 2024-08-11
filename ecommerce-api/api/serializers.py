from rest_framework import serializers

from . import models


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Product
        fields = "__all__"


class PartSerializer(serializers.ModelSerializer):
    # TODO: return options for each part here
    class Meta:
        model = models.Part
        fields = "__all__"


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Option
        fields = "__all__"


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.OrderItem
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    # TODO: return order items here with the order serializer
    class Meta:
        model = models.Order
        fields = "__all__"

    # in creating order we need to use
    # prohibitedCombination model to check for the options
    # priceRule to calculate any combinations that need an additional price
