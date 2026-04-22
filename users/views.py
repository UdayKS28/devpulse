from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import UserProfile, SavedProfile, SearchHistory
from .serializers import (
    RegisterSerializer, UserSerializer,
    SavedProfileSerializer, SearchHistorySerializer,
)


# ── Auth ──────────────────────────────────────────────────────────────────────

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': UserSerializer(user).data,
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Username and password required.'}, status=400)

    user = authenticate(username=username, password=password)
    if not user:
        return Response({'error': 'Invalid credentials.'}, status=401)

    refresh = RefreshToken.for_user(user)
    return Response({
        'user': UserSerializer(user).data,
        'access': str(refresh.access_token),
        'refresh': str(refresh),
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        refresh_token = request.data.get('refresh')
        if refresh_token:
            token = RefreshToken(refresh_token)
            token.blacklist()
    except Exception:
        pass
    return Response({'message': 'Logged out successfully.'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    return Response(UserSerializer(request.user).data)


# ── GitHub Token ──────────────────────────────────────────────────────────────

@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def github_token(request):
    profile, _ = UserProfile.objects.get_or_create(user=request.user)

    if request.method == 'PUT':
        token = request.data.get('github_token', '').strip()
        if not token:
            return Response({'error': 'github_token is required.'}, status=400)
        profile.github_token = token
        profile.save()
        return Response({'message': 'GitHub token saved.'})

    if request.method == 'DELETE':
        profile.github_token = None
        profile.save()
        return Response({'message': 'GitHub token removed.'})


# ── Saved Profiles ────────────────────────────────────────────────────────────

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def saved_profiles(request):
    if request.method == 'GET':
        profiles = SavedProfile.objects.filter(user=request.user)
        return Response(SavedProfileSerializer(profiles, many=True).data)

    if request.method == 'POST':
        username = request.data.get('github_username', '').strip()
        if not username:
            return Response({'error': 'github_username is required.'}, status=400)
        obj, created = SavedProfile.objects.get_or_create(
            user=request.user, github_username=username
        )
        status_code = status.HTTP_201_CREATED if created else status.HTTP_200_OK
        return Response(SavedProfileSerializer(obj).data, status=status_code)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def saved_profile_detail(request, pk):
    try:
        profile = SavedProfile.objects.get(pk=pk, user=request.user)
        profile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except SavedProfile.DoesNotExist:
        return Response({'error': 'Not found.'}, status=404)


# ── Search History ────────────────────────────────────────────────────────────

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def search_history(request):
    if request.method == 'GET':
        history = SearchHistory.objects.filter(user=request.user)[:20]
        return Response(SearchHistorySerializer(history, many=True).data)

    if request.method == 'POST':
        username = request.data.get('github_username', '').strip()
        if not username:
            return Response({'error': 'github_username is required.'}, status=400)
        entry = SearchHistory.objects.create(user=request.user, github_username=username)
        return Response(SearchHistorySerializer(entry).data, status=status.HTTP_201_CREATED)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def search_history_clear(request):
    SearchHistory.objects.filter(user=request.user).delete()
    return Response({'message': 'Search history cleared.'})