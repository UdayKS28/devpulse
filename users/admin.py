from django.contrib import admin
from .models import UserProfile, SavedProfile, SearchHistory

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'created_at')

@admin.register(SavedProfile)
class SavedProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'github_username', 'saved_at')

@admin.register(SearchHistory)
class SearchHistoryAdmin(admin.ModelAdmin):
    list_display = ('user', 'github_username', 'searched_at')