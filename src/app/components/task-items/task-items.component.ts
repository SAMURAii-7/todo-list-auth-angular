import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-items',
  templateUrl: './task-items.component.html',
  styleUrls: ['./task-items.component.css'],
})
export class TaskItemsComponent {
  @Input() task: Task = new Task();
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onEditTask: EventEmitter<Task> = new EventEmitter();

  faPen = faPen;
  faTrash = faTrash;

  handleDelete() {
    this.onDeleteTask.emit(this.task);
  }

  handleEdit() {
    this.onEditTask.emit(this.task);
  }
}
