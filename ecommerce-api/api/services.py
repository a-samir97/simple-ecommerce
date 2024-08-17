from django.db import transaction
from rest_framework.exceptions import ValidationError

from .models import CustomPrice
from .models import Order
from .models import OrderItem
from .models import ProhibitedCombination


class OrderService:
    def validate_options_quantity(self, options):
        # quantity check
        for option in options:
            if option.quantity < 1:
                raise ValidationError(
                    f"{option.name} is out of stock. please try again later"
                )

    def validate_prohibited_combinations(self, options):
        if ProhibitedCombination.objects.filter(options__in=options).exists():
            raise ValidationError(
                {
                    f"{', '.join([option.name for option in options])} are prohibited combinations"
                }
            )

    def create_order(self, user, price):
        return Order.objects.create(user=user, total_price=price)

    def create_order_item(self, options, product, order):
        order_item = OrderItem.objects.create(product=product, order=order)
        order_item.options.set(options)
        order_item.save()
        return order_item

    def check_custom_price_for_options(self, options):
        custom_price = CustomPrice.objects.filter(options__in=options).first()
        return custom_price.additional_price if custom_price else 0

    @transaction.atomic()
    def create_whole_order(self, data) -> list:
        order = Order.objects.create(user=data["user"], total_price=data["total_price"])
        for item_data in data["items"]:
            options = item_data["options"]
            self.validate_prohibited_combinations(options)
            self.validate_options_quantity(options)
            additional_price = self.check_custom_price_for_options(options)
            order.total_price += additional_price
            order.save()
            self.create_order_item(options, item_data["product"], order)
        return order
