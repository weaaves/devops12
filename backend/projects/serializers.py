from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Project, Task, Comment


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class ProjectSerializer(serializers.ModelSerializer):
    members = UserSerializer(many=True, read_only=True)
    member_ids = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='members', many=True, write_only=True)

    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'start_date', 'end_date', 'created_at', 'updated_at', 'members', 'member_ids']

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'task', 'user', 'content', 'created_at']

class TaskSerializer(serializers.ModelSerializer):
    assigned_to = UserSerializer(many=True, read_only=True)
    assigned_to_ids = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='assigned_to', many=True, write_only=True, required=False
    )
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Task
        fields = ['id', 'project', 'title', 'description', 'status', 'due_date', 'created_at', 'updated_at', 'assigned_to', 'assigned_to_ids', 'comments']