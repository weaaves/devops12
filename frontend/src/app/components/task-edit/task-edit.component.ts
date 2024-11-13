import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  task = {
    title: '',
    description: '',
    status: 'Pending',
    due_date: null,
    project: null
  };

  projects: any[] = [];

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((data: any) => {
      this.projects = data;
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? parseInt(idParam, 10) : null;

    if (id !== null) {
      this.taskService.getTaskById(id).subscribe((data: any) => {
        this.task = data;
      });
    } else {
      console.error('Invalid task ID');
    }
  }

  onSubmit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? parseInt(idParam, 10) : null;

    if (id !== null) {
      this.taskService.updateTask(id, this.task).subscribe(() => {
        alert('Task updated successfully');
        this.router.navigate(['/tasks']);
      });
    }
  }
}
