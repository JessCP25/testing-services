import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Person } from '../../models/person.model';

fdescribe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    component.person = new Person('Jessica', 'Payano', 25, 52, 1.5);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a person', () => {
    component.person = new Person('Jessica', 'Payano', 25, 52, 1.5);
    expect(component.person.name).toEqual('Jessica');
  });

  // it('should be a Component with contenido', () => {
  //   const personElement: HTMLElement = fixture.nativeElement;
  //   const p = personElement.querySelector('p');
  //   expect(p?.textContent).toEqual('Soy un párrafo')
  // });

  // it('should have <p> with "Soy un párrafo"</p>', () => {
  //   const debugElement: DebugElement = fixture.debugElement;
  //   const pDebug: DebugElement = debugElement.query(By.css('p'))
  //   const pElement: HTMLElement = pDebug.nativeElement;
  //   expect(pElement?.textContent).toEqual('Soy un párrafo')
  // });

  it('should have <p> with "Mi altura es: {person.height}"', () => {
    // Arrange
    component.person = new Person('Jessica', 'Payano', 25, 52, 1.5);
    const messageCompare = `Mi altura es: ${component.person.height}`;
    const debugElement: DebugElement = fixture.debugElement;
    const pDebug: DebugElement = debugElement.query(By.css('p'));
    const pElement: HTMLElement = pDebug.nativeElement;
    //Act
    fixture.detectChanges();

    expect(pElement?.textContent).toEqual(messageCompare);
  });

  it('should have <h3> with "Hola, soy {person.name}"', () => {
    component.person = new Person('Jessica', 'Payano', 25, 52, 1.5);
    const messageCompare = `Hola, soy ${component.person.name}`;
    const debugElement: DebugElement = fixture.debugElement;
    const h3Debug: DebugElement = debugElement.query(By.css('h3'));
    const h3Element: HTMLElement = h3Debug.nativeElement;
    // Act
    fixture.detectChanges();

    expect(h3Element?.textContent).toEqual(messageCompare);
  });

  it('should have <button> with call calcImc()', () => {
    component.person = new Person('Jose', 'Payano', 25, 130, 1.75);
    const messageCompare = `overweigth level 3`;
    const buttonElement: HTMLElement = fixture.debugElement.query(
      By.css('button.button-imc')
    ).nativeElement;
    // Act
    component.calcImc();
    fixture.detectChanges();

    expect(buttonElement?.textContent).toContain(messageCompare);
  });

  it('should have <button> click', () => {
    component.person = new Person('Jose', 'Payano', 25, 130, 1.75);
    const messageCompare = `overweigth level 3`;
    const debugElement: DebugElement = fixture.debugElement.query(
      By.css('button.button-imc')
    );
    const buttonElement: HTMLElement = debugElement.nativeElement;
    // Act
    debugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(buttonElement?.textContent).toContain(messageCompare);
  });

  it('should raise selected event when do click', () => {
    // Arrange
    const expectPerson = new Person('Jose', 'Payano', 25, 130, 1.75);
    component.person = new Person('Jose', 'Payano', 25, 130, 1.75);
    const debugElement: DebugElement = fixture.debugElement.query(
      By.css('button.button-choose')
    );

    let emittedPerson: Person | undefined;

    component.onSelected.subscribe((person) => {
      emittedPerson = person;
    });
    // Act
    debugElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    // Assert
    expect(emittedPerson).toEqual(expectPerson);
  });
});

@Component({
  standalone: true,
  imports: [PersonComponent],
  template: `<app-person
    [person]="person"
    (onSelected)="onSelected($event)"
  ></app-person>`,
})
export class HostComponent {
  person = new Person('Santiago', 'Molina', 13, 40, 1.5);
  selectedPerson: Person | undefined;
  onSelected(person: Person) {
    this.selectedPerson = person;
  }
}

fdescribe('PersonComponent from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent, PersonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show name', () => {
    // Arrange
    const expectName = 'Santiago';
    const h3Debug = fixture.debugElement.query(By.css('app-person h3'));
    const h3Element = h3Debug.nativeElement;
    // Act
    fixture.detectChanges();
    // Assert
    expect(h3Element.textContent).toContain(expectName);
  });

  it('should raise person with click', () => {
    // Arrange
    const btnDebug = fixture.debugElement.query(By.css('app-person .button-choose'));
    // Act
    btnDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Assert
    expect(component.selectedPerson).toEqual(component.person);
  })
})
