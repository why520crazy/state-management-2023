import { Component } from '@angular/core';
import { TodoListStore } from './todos.store';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent {
  store = new TodoListStore();
}
