import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hello-world';
}
@Component({
  selector: 'app-root-two',
  imports: [RouterOutlet],
  templateUrl: './app.component2.html',
  styleUrl: './app.component2.css'
})
export class AppComponentTwo {
  title = 'Button text';
}
