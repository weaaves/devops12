import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']

})
export class ProjectListComponent {
  projects: any[] = [];

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((data: any) => {
      this.projects = data;
    });
  }

  editProject(id: number): void {
    this.router.navigate(['/edit-project', id]);
  }

  deleteProject(id: number): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(id).subscribe(() => {
        this.projects = this.projects.filter(p => p.id !== id);
        alert('Project deleted successfully');
      });
    }
  }
}
