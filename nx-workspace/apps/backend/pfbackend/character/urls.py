from django.urls import include, path
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
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
router.register(r'specialabilities', views.SpecialAbilityViewSet)
router.register(r'characters', views.CharacterViewSet)
router.register(r'players', views.PlayerViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', views.SignupView.as_view(), name='signup'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]