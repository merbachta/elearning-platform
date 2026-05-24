from django.urls import path
from .views import (
    TaskListCreateView,
    TaskDetailView,
    SubmissionCreateView,
    SubmissionListView,
    SubmissionEvaluateView,
)

urlpatterns = [
    path('', TaskListCreateView.as_view(), name='task-list-create'),
    path('<int:pk>/', TaskDetailView.as_view(), name='task-detail'),
    path('submissions/', SubmissionCreateView.as_view(), name='submission-create'),
    path('submissions/list/', SubmissionListView.as_view(), name='submission-list'),
    path('submissions/<int:pk>/evaluate/', SubmissionEvaluateView.as_view(), name='submission-evaluate'),
]