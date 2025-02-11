import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hello world';
}

/*greet() { 

   console.log("hello");
   alert('Hello!'); 
   
}*/

@Component({ /* ... */ })
export class MyComponent {
  myVariable = 'Hello, World!';

  logSomething() {
    console.log('Value of myVariable:', this.myVariable);
    console.warn('This is a warning!');
    console.error('An error occurred!');
    console.info('Some informational message.');
    console.debug('Debugging information.'); // Often filtered out
    console.table([{ name: 'Alice', age: 30 }, { name: 'Bob', age: 25 }]); // Display data as a table
  }
}
