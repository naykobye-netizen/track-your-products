from django.db import models
from pgvector.django import VectorField
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
    model_embedding = models.CharField(max_length=60)
    summary = models.CharField(max_length=300)
    summary_embedding = VectorField(dimensions=1536)

# Product model that the user has added
class User_Product(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    target_price = models.IntegerField()
    review = models.CharField(null=True, max_length=300)

    # Prevent the user from adding the same product twice.
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'product'], name='unique_user_product')
        ]

# Product change history
class History_Price(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    now_price = models.IntegerField()
    change_percentage = models.IntegerField()
    in_stock = models.BooleanField()
    date = models.DateField()