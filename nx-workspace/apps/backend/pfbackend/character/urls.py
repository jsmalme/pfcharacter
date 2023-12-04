from django.urls import include, path
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views 

router = routers.DefaultRouter()
router.register(r'characters', views.CharacterViewSet)
router.register(r'players', views.PlayerViewSet)
router.register(r'feats', views.FeatViewSet)
router.register(r'spells', views.SpellViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', views.SignupView.as_view(), name='signup'),
    path('password-reset/', views.send_reset_password_email, name='password_reset'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]