"""Viewsets."""
from news.models import Article
from rest_framework import viewsets
from news.serializers import ArticleSerializer


class ArticleViewSet(viewsets.ModelViewSet):
    """Article viewset."""

    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
