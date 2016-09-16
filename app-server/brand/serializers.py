"""Brand serializers."""


from rest_framework import serializers
from brand.models import Brand


class BrandSerializer(serializers.HyperlinkedModelSerializer):
    """Brand serializer."""

    class Meta:
        """Meta."""

        model = Brand
        fields = (
            'id',
            'title',
            'phone',
            'email',
            'image_url',
        )
