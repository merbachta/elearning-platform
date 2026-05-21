from rest_framework import serializers
from .models import Task, Submission

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'deadline', 'created_by', 'created_at']
        read_only_fields = ['created_by', 'created_at']

class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = ['id', 'task', 'student', 'file', 'submitted_at', 'status', 'grade', 'feedback']
        read_only_fields = ['student', 'submitted_at', 'status', 'grade', 'feedback']

