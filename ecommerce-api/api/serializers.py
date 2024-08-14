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


class PartBulkCreateSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        part_data = [models.Part(**part) for part in validated_data]
        return models.Part.objects.bulk_create(part_data)


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Option
        fields = "__all__"


class PartSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Part
        fields = "__all__"
        list_serializer_class = PartBulkCreateSerializer


class RetrievePartOptionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True)

    class Meta:
        model = models.Part
        fields = ["name", "options"]


class BulkCreateCustomPriceSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        custom_price_data = [
            models.CustomPrice(**custom_price) for custom_price in validated_data
        ]
        return models.CustomPrice.objects.bulk_create(custom_price_data)


class CustomPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomPrice
        fields = "__all__"
        list_serializer_class = BulkCreateCustomPriceSerializer


class BulkCreateProhibitedCombinationSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        combinations = [
            models.ProhibitedCombination(**combination)
            for combination in validated_data
        ]
        return models.ProhibitedCombination.objects.bulk_create(combinations)


class ProhibitedCombinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProhibitedCombination
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
