import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Calculator } from './calculator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'testing-services';

  ngOnInit(): void {
    const calculator = new Calculator();
    const rta = calculator.multiply(3,3);
    console.log(rta === 9);
    const rta2 = calculator.divide(3,0);
    console.log(rta2 === null)
  }
}
