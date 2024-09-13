from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response
from .serializer import *


class UserView(APIView):
    def get(self, request):
        output = [{"username":output.username, "email":output.email}
                   for output in User.objects.all()]
        return Response(output)
    
    def post(self, request):
        serializer = UserSerializer(data = request.data) # type: ignore
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

