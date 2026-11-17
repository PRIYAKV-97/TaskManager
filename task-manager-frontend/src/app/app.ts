import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, NonNullableFormBuilder } from '@angular/forms';
import { TaskService } from './services/task.service';
import { Task } from './models/task.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
   private fb = inject(NonNullableFormBuilder);
  private taskService = inject(TaskService);

  tasks: Task[] = [];
  loading = false;
  saving = false;
  apiError = '';

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(150)]],
    description: ['', [Validators.maxLength(500)]]
  });

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.loading = true;
    this.taskService.getAll().subscribe({
      next: (res) => {
        this.tasks = res;
        this.loading = false;
      },
      error: () => {
        this.apiError = 'Could not connect to the backend. Make sure Spring Boot is running on port 8080.';
        this.loading = false;
      }
    });
  }

  submit(): void {
    if (this.form.invalid || this.form.value.title?.trim() === '') {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.apiError = '';

    this.taskService.create(this.form.getRawValue()).subscribe({
      next: (created) => {
        this.tasks = [created, ...this.tasks];
        this.form.reset();
        this.saving = false;
      },
      error: (err) => {
        this.apiError = err?.error?.detail || 'Something went wrong while saving the task.';
        this.saving = false;
      }
    });
  }
}