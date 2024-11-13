import { Component, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { TaskService } from '../../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailComponent } from '../task-detail/task-detail.component';


@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent implements OnInit {
  columns: { [key: string]: any[] } = {};
  tasks: any[] = [];
  statuses: string[] = ['Pending', 'In Progress', 'Completed'];

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((tasks: any[]) => {
      this.organizeTasksByStatus(tasks);
    });
  }

  organizeTasksByStatus(tasks: any[]) {
    this.columns = { 'Pending': [], 'In Progress': [], 'Completed': [] };
    tasks.forEach(task => {
      if (this.columns[task.status]) {
        this.columns[task.status].push(task);
      }
    });
  }

  isOverdue(task: any): boolean {
    return new Date(task.due_date) < new Date();
  }

  onDrop(event: CdkDragDrop<any[]>, status: string) {
    const task = event.item.data;
    task.status = status;
    this.updateTask(task);
  }

  updateTask(task: any) {
    const updatedData = {
      title: task.title,
      due_date: task.due_date,
      project: task.project,
      status: task.status,
      assigned_to_ids: task.assigned_to.map((user: any) => user.id)
    };

    this.taskService.updateTask(task.id, updatedData).subscribe(
      () => {
        this.loadTasks();
      },
      (error) => {
        console.error('Error updating task:', error);
      }
    );
  }

  moveTaskToNextStatus(task: any) {
    const currentIndex = this.statuses.indexOf(task.status);
    if (currentIndex < this.statuses.length - 1) {
      task.status = this.statuses[currentIndex + 1];
      this.updateTask(task);
    }
  }

  openTaskDetails(task: any): void {
    const dialogRef = this.dialog.open(TaskDetailComponent, {
      width: '600px',
      data: { task: task }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTasks();
      }
    });
  }
}
