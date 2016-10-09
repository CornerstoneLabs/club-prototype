"""Viewsets."""
from news.models import Article
from rest_framework import viewsets
from news.serializers import ArticleSerializer
from django.db.models import Q
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth.decorators import login_required


class ArticleViewSet(viewsets.ModelViewSet):
    """Article viewset."""

    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def perform_create(self, serializer):
        """Add sensible defaults."""
        serializer.save(author=self.request.user)

    def get_queryset(self):
        """Show all articles where draft=False or draft=True and author=False."""
        user = self.request.user
        if user is not AnonymousUser:
            q = Q(published=True) | (Q(published=False) & Q(author=user))
            queryset = Article.objects.filter(q)
            return queryset
