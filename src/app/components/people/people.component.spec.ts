import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleComponent } from './people.component';
import { PersonComponent } from '../person/person.component';
import { Person } from '../../models/person.model';
import { By } from '@angular/platform-browser';

fdescribe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleComponent, PersonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render people.length component person', () => {
    // Arrange
    component.people = [
      new Person('Jessica', 'Payano', 25, 1, 1),
      new Person('Silvia', 'Payano', 25, 1, 1),
      new Person('Camila', 'Payano', 25, 1, 1),
    ];
    // Act
    fixture.detectChanges();
    const personDegug = fixture.debugElement.queryAll(By.css('app-person'));
    // Assert
    expect(personDegug.length).toEqual(3);
  });

  it('should render the person with click and show selected person', ()=>{
    // Arrange
    const buttonDebug = fixture.debugElement.queryAll(By.css('app-person .button-choose'));
    // Act
    buttonDebug.forEach((btn, index) => {
      btn.triggerEventHandler('click', null);
      fixture.detectChanges();
      const selectedPerson = component.selectedPerson;

      const nameDebug = fixture.debugElement.query(By.css('.name'));
      const nameElement = nameDebug.nativeElement;
      const ageDebug = fixture.debugElement.query(By.css('.age'));
      const ageElement = ageDebug.nativeElement;
      // Assert
      expect(nameElement.textContent).toContain(selectedPerson?.name)
      expect(ageElement.textContent).toContain(selectedPerson?.age)

      expect(selectedPerson).toEqual(component.people[index]);
    })
  })
});
