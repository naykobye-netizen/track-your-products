from django.db import models
from users.models import User

# Product model
class Product(models.Model):
    name = models.CharField(max_length=30)
    url = models.CharField(max_length=200, unique=True)
    image_url = models.CharField(max_length=200)
    name_store = models.CharField(max_length=30)
    min_price = models.IntegerField()
    avg_price = models.IntegerField()
    max_price = models.IntegerField()
    at_register = models.DateField()

# Product model that the user has added
class UserProduct(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    target_price = models.IntegerField()
    review = models.CharField(null=True, max_length=300)
    at_created_review = models.DateTimeField(null=True)

    # Prevent the user from adding the same product twice.
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'product'],
                name='unique_user_product'
            )
        ]

# Product change history
class HistoryPrice(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    now_price = models.IntegerField()
    change_percentage = models.IntegerField()
    in_stock = models.BooleanField()
    date = models.DateField()