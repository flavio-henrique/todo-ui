import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/todos/services/todos.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  todos: any;
  currentTodo:any;
  currentIndex = -1;
  searchTitle = '';

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getAllTodos();
  }

  // Get list
  getAllTodos(): void {
    this.todoService.list()
      .subscribe(
        (todos: any) => {
          this.todos = todos;
        },
        (error: any) => {
          console.log(error);
        });
  }

  // Delete action
  deleteTodo(id:number){
    this.todoService.delete(id)
    .subscribe(
      () => {
        this.getAllTodos();
      },
      (error: any) => {
        console.log(error);
      });
  }

  // Search items
  searchByTitle(): void {
    this.todoService.filterByTitle(this.searchTitle)
      .subscribe(
        (todos: any) => {
          this.todos = todos;
        },
        (error: any) => {
          console.log(error);
        });
  }

}