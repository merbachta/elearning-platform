from django.db import models
from django.conf import settings

class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    deadline = models.DateTimeField()
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='created_tasks'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Submission(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('evaluated', 'Evaluated'),
    ]
    task = models.ForeignKey(
        Task,
        on_delete=models.CASCADE,
        related_name='submissions'
    )
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='submissions'
    )
    file = models.FileField(upload_to='submissions/')
    submitted_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )
    grade = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True
    )
    feedback = models.TextField(null=True, blank=True)

    def __str__(self): #Define cómo se representa el objeto como texto
        return f"{self.student.username} - {self.task.title}"
    #En este caso muestra el nombre del estudiante y el título de la tarea.