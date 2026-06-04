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
    student_username = serializers.CharField(source='student.username', read_only=True)
    task_title = serializers.CharField(source='task.title', read_only=True)

    class Meta:
        model = Submission
        fields = ['id', 'task', 'task_title', 'student', 'student_username', 
                  'file', 'submitted_at', 'status', 'grade', 'feedback']
        read_only_fields = ['student', 'submitted_at']

    def validate(self, data):
        task = data.get('task')
        if task and task.deadline < timezone.now():
            raise serializers.ValidationError("Cannot submit a task past its deadline.")
        return data

    def validate_file(self, value):
        video_types = ['video/mp4', 'video/avi', 'video/mov', 'video/mkv']
        if value.content_type in video_types:
            if value.size > 50 * 1024 * 1024:  # 50MB for videos
                raise serializers.ValidationError("Video files cannot exceed 50MB.")
        else:
            if value.size > 10 * 1024 * 1024:  # 10MB for other files (pdfs, images)
                raise serializers.ValidationError("File size cannot exceed 10MB.")
        return value
    
    