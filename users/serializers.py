from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile, SavedProfile, SearchHistory


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password_confirm')

    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({'password': 'Passwords do not match.'})
        return data

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(**validated_data)
        UserProfile.objects.create(user=user)
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class SavedProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedProfile
        fields = ('id', 'github_username', 'saved_at')
        read_only_fields = ('id', 'saved_at')


class SearchHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SearchHistory
        fields = ('id', 'github_username', 'searched_at')
        read_only_fields = ('id', 'searched_at')