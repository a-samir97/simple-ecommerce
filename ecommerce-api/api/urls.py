from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()

router.register("categories", views.CategoryViewSet, basename="categories")
router.register("products", views.ProductViewSet, basename="products")
router.register("parts", views.PartViewSet, basename="parts")
router.register("options", views.OptionViewSet, basename="options")
router.register("custom-prices", views.CustomPriceViewSet, basename="custom-prices")
router.register(
    "prohibited-combinations",
    views.ProhibitedCombinationViewSet,
    basename="prohibited-combinations",
)
router.register("orders", views.OrderViewSet, basename="orders")
router.register("order-items", views.OrderItemViewSet, basename="order-items")

urlpatterns = router.urls
