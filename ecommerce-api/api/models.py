from django.db import models


class Category(models.Model):
    """
    Category model, it is the category of the product
    each product should be mapped to one category
    """

    name = models.CharField(max_length=100)
    icon = models.ImageField()


class Product(models.Model):
    """
    Product Model, holds information of the specific product
    """

    name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField()


class Part(models.Model):
    """
    Part Model, it is the part that the product consisted of.
    each product can have one or more parts
    """

    name = models.CharField(max_length=100)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)


class Option(models.Model):
    """
    Option Model, represents the options available for a part
    """

    name = models.CharField(max_length=100)
    part = models.ForeignKey(Part, on_delete=models.CASCADE)
    price = models.FloatField()  # original price
    image = models.ImageField()
    quantity = models.PositiveIntegerField(default=0)


class ProhibitedCombination(models.Model):
    """
    ProhibitedCombinations Model, represents prohibited combinations options
    """

    options = models.ManyToManyField(Option, related_name="prohibited_combinations")


class CustomPrice(models.Model):
    """
    CustomPrice, represents a special price based on selected options
    """

    options = models.ManyToManyField(Option, related_name="price_rules")
    additional_price = models.FloatField()


class Order(models.Model):
    """
    Order Model, represents customer order
    """

    user = models.CharField(max_length=100)  # TODO: foreign key with user
    total_price = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)


class OrderItem(models.Model):
    """
    OrderItem Model, represents an item in customer order
    """

    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    option = models.ForeignKey(Option, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
