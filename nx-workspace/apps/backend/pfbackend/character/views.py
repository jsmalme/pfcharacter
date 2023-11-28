from typing import Any
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import CharacterSerializer, PlayerCreateSerializer, PlayerSerializer
from .models import Character, Player
Player = get_user_model()

@api_view(['POST'])
def login(request):
    player = Player.objects.get(email=request.data['email'])
    if not player.check_password(request.data['password']):
        return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
    token, created = Token.objects.get_or_create(user=player)
    serializer = PlayerSerializer(player)
    return Response({'token': token.key, 'player': serializer.data}, status=status.HTTP_200_OK)

class SignupView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = PlayerCreateSerializer(data=request.data)
        if serializer.is_valid():
            player = serializer.save()
            player.set_password(player.password)
            player.save()
            return Response({'player': serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CharacterViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Character.objects.all()
    serializer_class = CharacterSerializer
        
class PlayerViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Player.objects.all().order_by('-date_joined')
    serializer_class = PlayerSerializer


# class GeneralInfoViewSet(viewsets.ModelViewSet):
#     permission_classes = [IsAuthenticated]
#     queryset = GeneralInfo.objects.all()
#     serializer_class = GeneralInfoSerializer

# class AbilitiesViewSet(viewsets.ModelViewSet):
#     permission_classes = [IsAuthenticated]
#     queryset = Abilities.objects.all()
#     serializer_class = AbilitiesSerializer

# class SavingThrowsViewSet(viewsets.ModelViewSet):
#     permission_classes = [IsAuthenticated]
#     queryset = SavingThrows.objects.all()
#     serializer_class = SavingThrowsSerializer

# class CombatInfoViewSet(viewsets.ModelViewSet):
#     permission_classes = [IsAuthenticated]
#     queryset = CombatInfo.objects.all()
#     serializer_class = CombatInfoSerializer

# class EquipmentViewSet(viewsets.ModelViewSet):
#     permission_classes = [IsAuthenticated]
#     queryset = Equipment.objects.all()
#     serializer_class = EquipmentSerializer

# class SkillViewSet(viewsets.ModelViewSet):
#     permission_classes = [IsAuthenticated]
#     queryset = Skill.objects.all()
#     serializer_class = SkillSerializer

# class SpellsViewSet(viewsets.ModelViewSet):
#     permission_classes = [IsAuthenticated]
#     queryset = Spells.objects.all()
#     serializer_class = SpellsSerializer

# class FeatViewSet(viewsets.ModelViewSet):
#     permission_classes = [IsAuthenticated]
#     queryset = Feat.objects.all()
#     serializer_class = FeatSerializer

# class SpecialAbilityViewSet(viewsets.ModelViewSet):
#     permission_classes = [IsAuthenticated]
#     queryset = SpecialAbility.objects.all()
#     serializer_class = SpecialAbilitySerializer