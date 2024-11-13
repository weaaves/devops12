import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  project = {
    name: '',
    description: '',
    start_date: null,
    end_date: null,
    assigned_users: []
  };

  users: any[] = [];

  constructor(
    private projectService: ProjectService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  onSubmit() {
    const projectData = {
      name: this.project.name,
      description: this.project.description,
      start_date: this.project.start_date,
      end_date: this.project.end_date,
      member_ids: this.project.assigned_users
    };

    console.log('Project submitted:', projectData);

    this.projectService.createProject(projectData).subscribe({
      next: (response) => {
        console.log('Project created successfully', response);
      },
      error: (error) => {
        console.error('Error creating project:', error);
        if (error.error) {
          console.log('Details of the error:', error.error);
        }
      }
    });
  }



}
