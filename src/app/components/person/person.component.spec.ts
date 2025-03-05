import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Person } from '../../models/person.model';
import { finalize } from 'rxjs';

fdescribe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    component.person = new Person('Jessica', 'Payano', 25, 52, 1.50);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a person', () => {
    component.person = new Person('Jessica', 'Payano', 25, 52, 1.50);
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
    component.person = new Person('Jessica', 'Payano', 25, 52, 1.50);
    const messageCompare = `Mi altura es: ${component.person.height}`
    const debugElement: DebugElement = fixture.debugElement;
    const pDebug: DebugElement = debugElement.query(By.css('p'))
    const pElement: HTMLElement = pDebug.nativeElement;
    //Act
    fixture.detectChanges();

    expect(pElement?.textContent).toEqual(messageCompare)
  });

  it('should have <h3> with "Hola, soy {person.name}"', () => {
    component.person = new Person('Jessica', 'Payano', 25, 52, 1.50);
    const messageCompare = `Hola, soy ${component.person.name}`
    const debugElement: DebugElement = fixture.debugElement;
    const h3Debug: DebugElement = debugElement.query(By.css('h3'))
    const h3Element: HTMLElement = h3Debug.nativeElement;
    // Act
    fixture.detectChanges();

    expect(h3Element?.textContent).toEqual(messageCompare)
  });
});
