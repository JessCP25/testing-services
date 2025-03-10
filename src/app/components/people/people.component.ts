import { Component } from '@angular/core';
import { PersonComponent } from '../person/person.component';
import { Person } from '../../models/person.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [PersonComponent, CommonModule],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss',
})
export class PeopleComponent {
  people: Person[] = [
    new Person('Jessica', 'Payano', 25, 1, 1),
    new Person('Silvia', 'Payano', 25, 1, 1),
  ];

  selectedPerson: Person | null = null;

  choose(person: Person){
    this.selectedPerson = person;
  }
}
