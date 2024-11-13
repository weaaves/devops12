from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import UserViewSet, RegisterView, LoginView, CommentViewSet

router = DefaultRouter()
router.register(r'projects', views.ProjectViewSet)
router.register(r'tasks', views.TaskViewSet)
router.register(r'users', UserViewSet)
router.register(r'comments', CommentViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('reports/projects/pdf/', views.project_report_pdf, name='project_report_pdf'),
    path('reports/tasks/pdf/', views.task_report_pdf, name='task_report_pdf'),
    path('reports/projects/csv/', views.project_report_csv, name='project_report_csv'),
    path('reports/tasks/csv/', views.task_report_csv, name='task_report_csv'),

]
