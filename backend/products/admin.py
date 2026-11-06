from django.contrib import admin
from products.models import Product, UserProduct, HistoryPrice

# Registered models for the Django admin section.
admin.site.register(Product)
admin.site.register(UserProduct)
admin.site.register(HistoryPrice)