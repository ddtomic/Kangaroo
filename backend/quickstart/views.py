from django.contrib.auth.models import Group,User
from rest_framework import permissions,viewsets

from quickstart.serializers import GroupSerializer, UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    """API Endpoint where users are viewed and edited"""

    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """API Endpoint where groups are viewed and edited"""

    queryset = Group.objects.all().order_by('name')
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


