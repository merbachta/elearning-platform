from rest_framework import serializers
from .models import Task, Submission
from django.utils import timezone #AÑADIMOS ESTA IMPORTACIÓN

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'deadline', 'created_by', 'created_at']
        read_only_fields = ['created_by', 'created_at']

    def validate_deadline(self, value):  #AÑADIMOS ESTE MÉTODO
        if value < timezone.now():
            raise serializers.ValidationError("The deadline cannot be in the past.")
        return value   

class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = ['id', 'task', 'student', 'file', 'submitted_at', 'status', 'grade', 'feedback']
        read_only_fields = ['student', 'submitted_at']
    
    def validate(self, data): #AÑADIMOS ESTE MÉTODO
        task = data.get('task')
        if task and task.deadline < timezone.now():
            raise serializers.ValidationError("Cannot submit a task past its deadline.")
        return data

    def validate_file(self, value):
        if value.size > 10 * 1024 * 1024:
            raise serializers.ValidationError("File size cannot exceed 10MB.")
        return value
    
    