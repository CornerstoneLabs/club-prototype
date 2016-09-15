"""Article serializers."""


from rest_framework import serializers
from news.models import Article


class ArticleSerializer(serializers.HyperlinkedModelSerializer):
    """Article serializer."""

    class Meta:
        """Meta."""

        model = Article
        fields = (
            'id',
            'title',
            'content',
            'author',
            'date_published'
        )
