import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {

  todo = {
    title: '',
    description: ''
  };
  isTodoAdded = false;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void { }

  // Add New
  addTodo(): void {
    const data = {
      title: this.todo.title,
      description: this.todo.description
    };
    if (!data.title) {
      alert('Please add title!');
      return;
    }

    this.todoService.create(data)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.isTodoAdded = true;
        },
        (error: any) => {
          console.log(error);
        });
  }

  // Reset on adding new
  newTodo(): void {
    this.isTodoAdded = false;
    this.todo = {
      title: '',
      description: ''
    };
  }

}