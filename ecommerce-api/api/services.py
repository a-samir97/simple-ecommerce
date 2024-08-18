from django.db import transaction
from rest_framework.exceptions import ValidationError

from .models import CustomPrice
from .models import Order
from .models import OrderItem
from .models import ProhibitedCombination


class OrderService:
    def validate_options_quantity(self, options, quantity):
        # quantity check
        for option in options:
            if option.quantity < quantity:
                raise ValidationError(
                    f"{option.name} is out of stock. please try again later"
                )

    def validate_prohibited_combinations(self, options):
        if ProhibitedCombination.objects.filter(options__in=options).exists():
            raise ValidationError(
                f"The following options form a prohibited combination: {', '.join([option.name for option in options])}"
            )

    def create_order_item(self, options, product, order):
        order_item = OrderItem.objects.create(product=product, order=order)
        order_item.options.set(options)
        order_item.save()
        return order_item

    def check_custom_price_for_options(self, options):
        custom_price = (
            CustomPrice.objects.filter(options__in=options)
            .prefetch_related("options")
            .first()
        )
        return custom_price.additional_price if custom_price else 0

    def decrease_option_stock(self, options, quantity):
        for option in options:
            option.quantity -= quantity
            option.save()

    @transaction.atomic()
    def create_whole_order(self, data):
        order = Order.objects.create(user=data["user"], total_price=data["total_price"])
        for item_data in data["items"]:
            options = item_data["options"]
            quantity = item_data["quantity"]
            self.validate_prohibited_combinations(options)
            self.validate_options_quantity(options, quantity)
            additional_price = self.check_custom_price_for_options(options)
            order.total_price += additional_price
            self.decrease_option_stock(options, quantity)
            self.create_order_item(options, item_data["product"], order)
            order.save()
        return order
