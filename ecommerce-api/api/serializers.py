from rest_framework import serializers
from rest_framework.validators import ValidationError

from . import constants
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
            models.CustomPrice(
                **{k: v for k, v in custom_price.items() if k != "options"}
            )
            for custom_price in validated_data
        ]
        created_custom_prices = models.CustomPrice.objects.bulk_create(
            custom_price_data
        )

        # Handle M2M field (options) manually
        for custom_price, data in zip(created_custom_prices, validated_data):
            custom_price.options.set(data["options"])

        return created_custom_prices


class CustomPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomPrice
        fields = "__all__"
        list_serializer_class = BulkCreateCustomPriceSerializer

    def validate(self, attrs):
        super(CustomPriceSerializer, self).validate(attrs)
        if len(attrs["options"]) < 2:
            raise ValidationError(constants.ERR_MSG_AT_LEAST_2_OPTIONS)
        return attrs


class BulkCreateProhibitedCombinationSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        # Create the ProhibitedCombination instances without M2M data
        combinations = [models.ProhibitedCombination() for _ in validated_data]
        created_combinations = models.ProhibitedCombination.objects.bulk_create(
            combinations
        )

        # Assign the M2M fields
        for combination, data in zip(created_combinations, validated_data):
            combination.options.set(data["options"])

        return created_combinations


class ProhibitedCombinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProhibitedCombination
        fields = "__all__"
        list_serializer_class = BulkCreateProhibitedCombinationSerializer

    def validate(self, attrs):
        super(ProhibitedCombinationSerializer, self).validate(attrs)
        if len(attrs["options"]) < 2:
            raise ValidationError(constants.ERR_MSG_AT_LEAST_2_OPTIONS)
        return attrs


class OrderItemSerializer(serializers.ModelSerializer):
    quantity = serializers.IntegerField()

    class Meta:
        model = models.OrderItem
        fields = ["product", "options", "quantity"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(write_only=True, many=True)

    class Meta:
        model = models.Order
        fields = ["user", "total_price", "items", "timestamp"]
