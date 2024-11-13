import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task: any = {};
  comments: any[] = [];
  newComment = new FormControl('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task: any },
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.task = this.data.task;
    this.loadComments();
  }

  addComment() {
    const content = this.newComment.value;
    if (content) {
      this.taskService.addComment(this.task.id, content).subscribe(() => {
        this.newComment.reset();
        this.loadComments();
      });
    }
  }

  loadComments() {
    this.taskService.getTaskById(this.task.id).subscribe((data: any) => {
      console.log('Task data:', data);
      this.comments = data.comments || [];
    });
  }

}
