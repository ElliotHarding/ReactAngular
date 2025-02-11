import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

/**/
@Component({
  selector: 'app-hello-world',
  template: `
    <p>app-hello-world</p>
  `
})

export class HelloWorldComponent {
  name = 'World';
  showGreeting = true; // Add a property to control visibility
  names = ['Alice', 'Bob', 'Charlie'];
}

export class AppComponent {
  title = 'hello-world';
}

import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]' // Attribute selector
})
export class HighlightDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', 'yellow');
  }
}
