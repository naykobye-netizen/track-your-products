from django.core.management.base import BaseCommand
from django.utils import timezone

from users.models import Verification

# This command allows for the periodic cleanup of the user verification database, removing incorrectly registered users and unused verifications
class Command(BaseCommand):

    def handle(self, *args, **kwargs):
        verifications = Verification.objects.all()
        for v in verifications:
            if v.expires_at < timezone.now():
                user = v.user
                if (user.is_active == False):
                    user.delete()
                v.delete()