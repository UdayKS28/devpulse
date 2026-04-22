from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    # Auth
    path('auth/register/',          views.register,             name='register'),
    path('auth/login/',             views.login,                name='login'),
    path('auth/logout/',            views.logout,               name='logout'),
    path('auth/me/',                views.me,                   name='me'),
    path('auth/refresh/',           TokenRefreshView.as_view(), name='token_refresh'),

    # GitHub token
    path('github-token/',           views.github_token,         name='github-token'),

    # Saved profiles
    path('saved-profiles/',         views.saved_profiles,       name='saved-profiles'),
    path('saved-profiles/<int:pk>/',views.saved_profile_detail, name='saved-profile-detail'),

    # Search history
    path('search-history/',         views.search_history,       name='search-history'),
    path('search-history/clear/',   views.search_history_clear, name='search-history-clear'),
]