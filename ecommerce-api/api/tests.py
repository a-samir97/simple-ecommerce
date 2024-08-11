import tempfile
from io import BytesIO

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
        content=open("./download.png", "rb").read(),
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
        pass

    def test_update_existing_category_with_invalid_data(self):
        pass

    def test_update_non_existing_category(self):
        pass

    def test_delete_existing_category(self):
        pass

    def test_delete_non_existing_category(self):
        pass

    def test_list_all_cateogries(self):
        pass

    def test_get_existing_category_by_id(self):
        pass

    def test_get_non_existing_category_by_id(self):
        pass


class ProductAPIsTest(TestCase):
    def setUp(self) -> None:
        pass

    def tearDown(self) -> None:
        pass

    def test_create_product_with_valid_data(self):
        pass

    def test_create_product_with_invalid_data(self):
        pass

    def test_list_all_products(self):
        pass

    def test_get_existing_product_by_id(self):
        pass

    def test_get_non_existing_product_by_id(self):
        pass


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
