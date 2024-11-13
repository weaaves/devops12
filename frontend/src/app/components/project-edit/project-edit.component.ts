import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  project: any = {};

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? parseInt(idParam, 10) : null;

    if (id !== null) {
      this.projectService.getProjectById(id).subscribe((data: any) => {
        this.project = data;
      });
    } else {
      console.error('Invalid project ID');
    }
  }

  onSubmit() {
    this.projectService.updateProject(this.project.id, this.project).subscribe(() => {
      alert('Project updated successfully');
      this.router.navigate(['/projects']);
    });
  }
}
