import tempfile

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import override_settings
from django.test import TestCase
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.test import APIClient

from .models import Category
from .models import CustomPrice
from .models import Option
from .models import Order
from .models import OrderItem
from .models import Part
from .models import Product
from .models import ProhibitedCombination
from .services import OrderService


def get_temporary_image():
    return SimpleUploadedFile(
        name="test_image.jpg",
        content=open("./utiles/download.png", "rb").read(),
        content_type="image/jpeg",
    )


@override_settings(MEDIA_ROOT=tempfile.gettempdir())
class CategoryAPIsTest(TestCase):
    def setUp(self) -> None:
        self.category = Category.objects.create(name="Test", icon=get_temporary_image())
        self.client = APIClient()
        self.url = "/api/categories/"

    def tearDown(self) -> None:
        Category.objects.all().delete()

    def test_create_category_with_valid_data(self):
        data = {"name": "Test Category", "icon": get_temporary_image()}
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # get the last created category
        last_category = Category.objects.last()

        self.assertEqual(last_category.name, data["name"])
        self.assertEqual(last_category.id, response.data["id"])

    def test_create_category_with_invalid_data(self):
        # send data without name of the category
        data = {"icon": get_temporary_image()}

        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_existing_category_with_valid_data(self):
        data = {"name": "new test"}
        response = self.client.patch(f"{self.url}{self.category.id}/", data=data)
        self.category.refresh_from_db()

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.category.name, data["name"])

    def test_update_existing_category_with_invalid_data(self):
        # invalid input
        data = {"name": ""}
        response = self.client.patch(f"{self.url}{self.category.id}/", data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_non_existing_category(self):
        data = {"name": "test"}
        # invalid category id
        response = self.client.patch(f"{self.url}{10000}/", data=data)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_existing_category(self):
        # count categories before calling delete endpoint
        categories_count_before = Category.objects.count()
        response = self.client.delete(f"{self.url}{self.category.id}/")

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Category.objects.count(), categories_count_before - 1)

    def test_delete_non_existing_category(self):
        # invalid category id
        response = self.client.delete(f"{self.url}{10000}/")

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_list_all_cateogries(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_existing_category_by_id(self):
        response = self.client.get(f"{self.url}{self.category.id}/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], self.category.name)
        self.assertEqual(response.data["id"], self.category.id)

    def test_get_non_existing_category_by_id(self):
        response = self.client.get(f"{self.url}{10000}/")

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class ProductAPIsTest(TestCase):
    def setUp(self) -> None:
        self.category = Category.objects.create(
            name="test category", icon=get_temporary_image()
        )
        self.product = Product.objects.create(
            name="product test",
            image=get_temporary_image(),
            category=self.category,
        )
        self.client = APIClient()
        self.url = "/api/products/"

    def tearDown(self) -> None:
        Product.objects.all().delete()
        Category.objects.all().delete()

    def test_create_product_with_valid_data(self):
        data = {
            "name": "test product",
            "image": get_temporary_image(),
            "category": self.category.id,
        }

        response = self.client.post(self.url, data=data)

        # get the last created product
        last_product = Product.objects.last()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["id"], last_product.id)
        self.assertEqual(response.data["name"], last_product.name)

    def test_create_product_with_invalid_data(self):
        # invalid data
        data = {}

        response = self.client.post(self.url, data=data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_list_all_products(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # TODO: test counts after pagination

    def test_get_existing_product_by_id(self):
        response = self.client.get(f"{self.url}{self.product.id}/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["id"], self.product.id)
        self.assertEqual(response.data["name"], self.product.name)
        self.assertEqual(response.data["category"], self.product.category.id)

    def test_get_non_existing_product_by_id(self):
        # invalid product id
        response = self.client.get(f"{self.url}{100000}/")

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class PartAPIsTest(TestCase):
    def setUp(self) -> None:
        self.product = Product.objects.create(
            category=Category.objects.create(
                icon=get_temporary_image(), name="category test"
            ),
            name="product",
            image=get_temporary_image(),
        )
        self.part = Part.objects.create(product=self.product, name="New Part")
        self.client = APIClient()
        self.url = "/api/parts/"

    def tearDown(self) -> None:
        Product.objects.all().delete()
        Category.objects.all().delete()
        Part.objects.all().delete()

    def test_create_part_for_existing_product_with_valid_data(self):
        data = {"product": self.product.id, "name": "part 2"}

        response = self.client.post(self.url, data=data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # get the last created part
        last_created_part = Part.objects.last()

        self.assertEqual(last_created_part.name, data["name"])
        self.assertEqual(last_created_part.product.id, data["product"])

    def test_create_part_for_non_existing_product(self):
        data = {"product": 1221212, "name": "invalid part"}  # invalid product id

        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_part_for_existing_product_with_invalid_data(self):
        data = {"product": self.product.id}
        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("name", response.data)

    def test_list_all_parts_related_to_specific_product(self):
        pass

    def test_update_existing_part_with_valid_data(self):
        data = {"name": "edited part"}

        response = self.client.patch(f"{self.url}{self.part.id}/", data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.part.refresh_from_db()
        self.assertEqual(self.part.name, data["name"])

    def test_update_non_existing_part(self):
        data = {"name": "edited part"}

        # invalid part id
        response = self.client.patch(f"{self.url}{100000}/", data)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_existing_part(self):
        response = self.client.delete(f"{self.url}{self.part.id}/")

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_non_existing_part(self):
        # invalid part id
        response = self.client.delete(f"{self.url}{1212121212}/")

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class OptionAPIsTest(TestCase):
    def setUp(self) -> None:
        self.product = Product.objects.create(
            category=Category.objects.create(
                icon=get_temporary_image(), name="category test"
            ),
            name="product",
            image=get_temporary_image(),
        )
        self.part = Part.objects.create(product=self.product, name="New Part")
        self.option = Option.objects.create(
            part=self.part,
            image=get_temporary_image(),
            name="Option",
            price=120,
        )
        self.client = APIClient()
        self.url = "/api/options/"

    def tearDown(self) -> None:
        Product.objects.all().delete()
        Category.objects.all().delete()
        Part.objects.all().delete()
        Option.objects.all().delete()

    def test_create_option_for_specific_part_valid_data(self):
        data = {
            "name": "test",
            "image": get_temporary_image(),
            "price": 20,
            "part": self.part.id,
        }

        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        last_created_option = Option.objects.last()

        self.assertEqual(last_created_option.name, data["name"])
        self.assertEqual(last_created_option.price, data["price"])
        self.assertEqual(last_created_option.part.id, data["part"])

    def test_create_option_for_specific_part_invalid_data(self):
        data = {}

        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_list_all_options_related_to_specific_part(self):
        pass

    def test_update_existing_option(self):
        data = {"name": "name changed"}

        response = self.client.patch(f"{self.url}{self.option.id}/", data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.option.refresh_from_db()
        self.assertEqual(self.option.name, data["name"])

    def test_update_non_existing_option(self):
        data = {"name": "name changed"}
        # invalid option id
        response = self.client.patch(f"{self.url}{100000}/", data=data)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_existing_option(self):
        response = self.client.delete(f"{self.url}{self.option.id}/")

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_non_existing_option(self):
        # invalid option id
        response = self.client.delete(f"{self.url}{100000}/")

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class PriceRuleAPIsTest(TestCase):
    def setUp(self) -> None:
        self.product = Product.objects.create(
            category=Category.objects.create(
                icon=get_temporary_image(), name="category test"
            ),
            name="product",
            image=get_temporary_image(),
        )
        self.part = Part.objects.create(product=self.product, name="New Part")
        self.option_1 = Option.objects.create(
            part=self.part,
            image=get_temporary_image(),
            name="Option",
            price=120,
        )
        self.option_2 = Option.objects.create(
            part=self.part,
            image=get_temporary_image(),
            name="Option",
            price=120,
        )
        self.client = APIClient()
        self.url = "/api/custom-prices/"

    def test_create_custom_price_with_one_option_failure_case(self):
        data = {"options": [self.option_1.id], "additional_price": 120}

        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_custom_price_with_valid_data(self):
        data = {
            "options": [self.option_1.id, self.option_2.id],
            "additional_price": 120,
        }

        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class ProhibitedCombinationsAPIsTest(TestCase):
    def setUp(self) -> None:
        self.product = Product.objects.create(
            category=Category.objects.create(
                icon=get_temporary_image(), name="category test"
            ),
            name="product",
            image=get_temporary_image(),
        )
        self.part = Part.objects.create(product=self.product, name="New Part")
        self.option_1 = Option.objects.create(
            part=self.part,
            image=get_temporary_image(),
            name="Option",
            price=120,
        )
        self.option_2 = Option.objects.create(
            part=self.part,
            image=get_temporary_image(),
            name="Option",
            price=120,
        )
        self.client = APIClient()
        self.url = "/api/prohibited-combinations/"

    def test_create_prohibited_combination_with_one_option_failure_case(self):
        data = {"options": [self.option_1.id]}

        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_prohibited_combinationse_with_valid_data(self):
        data = {
            "options": [self.option_1.id, self.option_2.id],
        }

        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class OrderServiceTest(TestCase):
    def setUp(self) -> None:
        self.product = Product.objects.create(
            category=Category.objects.create(
                icon=get_temporary_image(), name="category test"
            ),
            name="good product",
            image=get_temporary_image(),
        )
        self.part = Part.objects.create(product=self.product, name="Great Part")
        self.options = [
            Option.objects.create(
                image=get_temporary_image(), part=self.part, price=100, quantity=2
            ),
            Option.objects.create(
                image=get_temporary_image(), part=self.part, price=100, quantity=2
            ),
            Option.objects.create(
                image=get_temporary_image(), part=self.part, price=100, quantity=0
            ),
        ]
        self.service = OrderService()

    def test_validate_quantity_for_options(self):
        self.assertIsNone(self.service.validate_options_quantity(self.options[:2]))

    def test_validate_quantity_for_options_has_less_than_1(self):
        with self.assertRaises(ValidationError):
            self.service.validate_options_quantity(self.options)

    def test_create_order(self):
        created_order = self.service.create_order(user="best user", price=1200)
        self.assertEqual(created_order.total_price, 1200)
        self.assertEqual(created_order.user, "best user")
        self.assertIsInstance(created_order, Order)

    def test_create_order_item(self):
        temp_order = self.service.create_order(user="Test", price=100)
        order_item = self.service.create_order_item(
            options=self.options, product=self.product, order=temp_order
        )

        self.assertEqual(order_item.order.id, temp_order.id)
        self.assertEqual(order_item.product.id, self.product.id)
        self.assertIsInstance(order_item, OrderItem)

    def test_check_prohibited_combination_for_options(self):
        self.assertIsNone(self.service.validate_prohibited_combinations(self.options))

    def test_check_available_prohibited_combinations(self):
        combinations = ProhibitedCombination.objects.create()
        combinations.options.set(self.options)
        combinations.save()

        with self.assertRaises(ValidationError):
            self.service.validate_prohibited_combinations(self.options)

    def test_options_have_custom_price(self):
        custom_price = CustomPrice.objects.create(additional_price=100)
        custom_price.options.set(self.options)
        custom_price.save()

        price = self.service.check_custom_price_for_options(self.options)
        self.assertEqual(price, 100)

    def test_options_have_not_custom_price(self):
        price = self.service.check_custom_price_for_options(self.options)

        self.assertEqual(price, 0)

    def test_whole_process_of_creating_order(self):
        data = {
            "items": [
                {
                    "options": [self.options[0], self.options[1]],
                    "product": self.product,
                }
            ],
            "user": "great user",
            "total_price": 1200,
        }
        created_order = self.service.create_whole_order(data)
        self.assertIsInstance(created_order, Order)


class OrderAPIsTest(TestCase):
    def setUp(self) -> None:
        self.product = Product.objects.create(
            category=Category.objects.create(
                icon=get_temporary_image(), name="category test"
            ),
            name="good product",
            image=get_temporary_image(),
        )
        self.part = Part.objects.create(product=self.product, name="Great Part")
        self.options = [
            Option.objects.create(
                image=get_temporary_image(), part=self.part, price=100, quantity=2
            ),
            Option.objects.create(
                image=get_temporary_image(), part=self.part, price=100, quantity=2
            ),
            Option.objects.create(
                image=get_temporary_image(), part=self.part, price=100, quantity=0
            ),
        ]
        self.client = APIClient()
        self.url = "/api/orders/"

    def test_create_order_success_case(self):
        order_count_before = Order.objects.count()
        order_items_count_before = OrderItem.objects.count()
        items = [
            {
                "options": [self.options[0].id, self.options[1].id],
                "product": self.product.id,
            },
            {
                "options": [self.options[0].id, self.options[1].id],
                "product": self.product.id,
            },
        ]
        data = {
            "items": items,
            "user": "great user",
            "total_price": self.options[0].price + self.options[1].price,
        }

        response = self.client.post(self.url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Order.objects.count(), order_count_before + 1)
        self.assertEqual(OrderItem.objects.count(), order_items_count_before + 2)
