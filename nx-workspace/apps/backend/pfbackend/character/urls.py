from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'generalinfo', views.GeneralInfoViewSet)
router.register(r'abilities', views.AbilitiesViewSet)
router.register(r'savingthrows', views.SavingThrowsViewSet)
router.register(r'combatinfo', views.CombatInfoViewSet)
router.register(r'equipment', views.EquipmentViewSet)
router.register(r'skills', views.SkillViewSet)
router.register(r'spells', views.SpellsViewSet)
router.register(r'feats', views.FeatViewSet)
router.register(r'specialability', views.SpecialAbilityViewSet)
router.register(r'character', views.CharacterViewSet)
router.register(r'player', views.PlayerViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]