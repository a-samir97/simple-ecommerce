import tempfile

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import override_settings
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient

from .models import Category
from .models import Option
from .models import Part
from .models import Product


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
        pass

    def tearDown(self) -> None:
        pass

    def test_create_part_for_existing_product_with_valid_data(self):
        pass

    def test_create_part_for_non_existing_product(self):
        pass

    def test_create_part_for_existing_product_with_invalid_data(self):
        pass

    def test_list_all_parts_related_to_specific_product(self):
        pass

    def test_update_existing_part_with_valid_data(self):
        pass

    def test_update_non_existing_part(self):
        pass

    def test_delete_existing_part(self):
        pass

    def test_delete_non_existing_part(self):
        pass


class OptionAPIsTest(TestCase):
    def setUp(self) -> None:
        pass

    def tearDown(self) -> None:
        pass

    def test_create_option_for_specific_part_valid_data(self):
        pass

    def test_create_option_for_specific_part_invalid_data(self):
        pass

    def test_list_all_options_related_to_specific_part(self):
        pass

    def test_update_existing_option(self):
        pass

    def test_update_non_existing_option(self):
        pass

    def test_delete_existing_option(self):
        pass

    def test_delete_non_existing_option(self):
        pass


class PriceRuleAPIsTest(TestCase):
    pass


class ProhibitedCombinationsAPIsTest(TestCase):
    pass


class OrderAPIsTest(TestCase):
    pass


class OrderItemAPIsTest(TestCase):
    pass
