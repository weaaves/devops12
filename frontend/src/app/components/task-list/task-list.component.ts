import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  tasks: any[] = [];
  allTasks: any[] = [];
  projects: any[] = [];

  constructor(
    private taskService: TaskService,
    private router: Router,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data: any) => {
      this.tasks = data;
      this.allTasks = data;
    });

    this.projectService.getProjects().subscribe((data: any) => {
      this.projects = data;
    });
  }

  editTask(id: number): void {
    this.router.navigate(['/edit-task', id]);
  }

  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe(() => {
        this.tasks = this.tasks.filter(t => t.id !== id);
        alert('Task deleted successfully');
      });
    }
  }

  selectedProject: string = '';
  selectedPriority: string = '';

  filterTasks(): void {
    this.tasks = this.allTasks.filter(task => {
      return (this.selectedProject ? task.project === this.selectedProject : true) &&
        (this.selectedPriority ? task.priority === this.selectedPriority : true);
    });
  }

  isOverdue(task: any): boolean {
    const today = new Date();
    const dueDate = new Date(task.due_date);
    return dueDate < today && task.status !== 'Completed';
  }

}
