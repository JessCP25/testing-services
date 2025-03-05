import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // it('should be a Component with contenido', () => {
  //   const personElement: HTMLElement = fixture.nativeElement;
  //   const p = personElement.querySelector('p');
  //   expect(p?.textContent).toEqual('Soy un párrafo')
  // });

  it('should have <p> with "Soy un párrafo"</p>', () => {
    const debugElement: DebugElement = fixture.debugElement;
    const pDebug: DebugElement = debugElement.query(By.css('p'))
    const pElement: HTMLElement = pDebug.nativeElement;
    expect(pElement?.textContent).toEqual('Soy un párrafo')
  });

  it('should have <h3> with "Hola, personComponent"</h3>', () => {
    const debugElement: DebugElement = fixture.debugElement;
    const h3Debug: DebugElement = debugElement.query(By.css('h3'))
    const h3Element: HTMLElement = h3Debug.nativeElement;
    expect(h3Element?.textContent).toEqual('Hola, personComponent')
  });
});
