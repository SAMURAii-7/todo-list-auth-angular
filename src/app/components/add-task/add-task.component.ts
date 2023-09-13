import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnChanges,
} from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnChanges {
  title: string = '';
  @Input() taskToBeEdited: Task = new Task();
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  @Output() onEditTaskChange: EventEmitter<Task> = new EventEmitter();

  ngOnChanges() {
    if (this.taskToBeEdited.title.length > 0)
      this.title = this.taskToBeEdited.title;
  }

  onClick() {
    const newTask = new Task();
    newTask.title = this.title;
    this.onAddTask.emit(newTask);
    this.title = '';
  }
  onEditClick() {
    this.taskToBeEdited.title = this.title;
    this.onEditTaskChange.emit(this.taskToBeEdited);
    this.taskToBeEdited = new Task();
    this.title = '';
  }
}
