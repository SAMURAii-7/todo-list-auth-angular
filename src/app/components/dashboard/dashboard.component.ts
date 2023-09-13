import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  taskToBeEdited: Task = new Task();

  ngOnInit(): void {
    this.tasks = [];
    this.getTasks();
  }

  constructor(private crudService: CrudService) {}

  getTasks() {
    this.crudService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  addTask(task: Task) {
    this.crudService.addTask(task).subscribe(() => {
      this.ngOnInit();
    });
  }

  deleteTask(task: Task) {
    this.crudService.deleteTask(task).subscribe(() => {
      this.ngOnInit();
    });
  }

  receiveEditTask(task: Task) {
    this.taskToBeEdited = task;
  }

  editTask(task: Task) {
    this.crudService.editTask(task).subscribe(() => {
      this.ngOnInit();
    });
  }
}
