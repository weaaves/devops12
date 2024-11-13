import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: [ './task-form.component.css' ]
})
export class TaskFormComponent implements OnInit {
  task = {
    title: '',
    description: '',
    status: 'Pending',
    due_date: null as string | null,
    project: null,
    assigned_to_ids: [] as number[]
  };

  projects: any[] = [];
  users: any[] = [];

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((data: any) => {
      this.projects = data;
    });

    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  onSubmit() {
    console.log('Task submitted:', this.task);

    const formattedDueDate = typeof this.task.due_date === 'object' && this.task.due_date !== null
      ? (this.task.due_date as Date).toISOString().split('T')[0]
      : this.task.due_date;

    const taskToSubmit = {
      ...this.task,
      due_date: formattedDueDate
    };

    this.taskService.createTask(taskToSubmit).subscribe(
      response => {
        console.log('Task created successfully!', response);
        alert('Task created successfully!');
        this.task = {
          title: '',
          description: '',
          status: 'Pending',
          due_date: null,
          project: null,
          assigned_to_ids: []
        };
      },
      error => {
        console.error('Error creating task:', error.error);
        alert('Error creating task. Please try again.');
      }
    );
  }
}
