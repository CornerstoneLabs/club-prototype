"""Clubserver URL Configuration.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from brand.viewsets import BrandViewSet
from classes.viewsets import ClassSessionNotificationViewset
from classes.viewsets import ClassSessionViewSet
from classes.viewsets import ClassViewSet
from classes.viewsets import LocationViewSet
from clubserver.viewsets import UserViewSet
from django.conf import settings
from django.conf.urls import include
from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib import admin
from news.viewsets import ArticleViewSet
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token
from userprofile.viewsets import UserProfileViewSet
import classes.views

admin.site.site_header = 'Club Admin'

router = routers.DefaultRouter()
router.register(r'articles', ArticleViewSet)
router.register(r'brand', BrandViewSet)
router.register(r'class-session', ClassSessionViewSet)
router.register(r'class-session-notification', ClassSessionNotificationViewset)
router.register(r'classes', ClassViewSet)
router.register(r'locations', LocationViewSet)
router.register(r'user-profile', UserProfileViewSet)
router.register(r'users', UserViewSet)


urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^actions/classes/notifications/like/$', classes.views.class_session_notification_liked),
    url(r'^actions/classes/current-user/$', classes.views.current_user),
    url(r'^actions/classes/check-in/$', classes.views.check_in),
    url(r'^actions/classes/add-participant/$', classes.views.add_participant),
    url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
