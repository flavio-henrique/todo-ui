import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from 'src/app/todos/services/todos.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit {

  currentTodo: any;
  message = '';

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getTodo(this.route.snapshot.paramMap.get('id'));
  }

  getTodo(id: string | null): void {
    this.todoService.getItem(id)
      .subscribe(
        (todo: null) => {
          this.currentTodo = todo;
          console.log(todo);
        },
        (error: any) => {
          console.log(error);
        });
  }

  setAvailableStatus(status: any): void {
    const data = {
      name: this.currentTodo.name,
      description: this.currentTodo.description,
      available: status
    };

    this.todoService.update(this.currentTodo.id, data)
      .subscribe(
        response => {
          this.currentTodo.available = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateTodo(): void {
    this.todoService.update(this.currentTodo.id, this.currentTodo)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The product was updated!';
          this.router.navigate(['todos']);
        },
        error => {
          console.log(error);
        });
  }

  deleteTodo(): void {
    this.todoService.delete(this.currentTodo.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/todos']);
        },
        error => {
          console.log(error);
        });
  }

}