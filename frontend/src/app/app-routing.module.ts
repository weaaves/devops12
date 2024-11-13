import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import {ProjectEditComponent} from './components/project-edit/project-edit.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { AuthGuard } from './guards/auth.guard';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import { ReportsComponent } from './reports/reports.component';


const routes: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: 'projects', component: ProjectListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'add-project', component: ProjectFormComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: 'add-task', component: TaskFormComponent },
  { path: 'edit-project/:id', component: ProjectEditComponent },
  { path: 'edit-task/:id', component: TaskEditComponent },
  { path: 'board', component: TaskBoardComponent },
  { path: 'reports', component: ReportsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
