import { Calculator } from './calculator';

fdescribe('Test for Calculator', () => {
  it('#multiply should be a nine', () => {
    // AAA
    // Arrange
    const calculator = new Calculator();
    // Act
    const rta = calculator.multiply(3, 3);
    // Assert
    expect(rta).toEqual(9);
  });

  it('#divide should be a null', () => {
    // Arrange
    const calculator = new Calculator();
    // Act
    const rta = calculator.divide(3, 0);
    // Assert
    expect(rta).toBeNull();
  });

  it('#matches', () => {
    // Arrange

    // Act
    let name = 'nicolas';
    let name2;
    // Assert
    expect(name).toBeDefined();
    expect(name2).toBeUndefined();
    expect(1 + 4 === 5).toBeTruthy();
    expect(4 < 2).toBeFalsy();
    expect(5).toEqual(5);
    expect(3).toBeGreaterThan(1);
    expect(6).toBeGreaterThanOrEqual(6);
    expect(3).toBeLessThan(5);
    expect(5).toBeLessThanOrEqual(5);
    expect(0.3).toBeCloseTo(0.3);
    expect('123456').not.toMatch(/U/);
    expect('lunch').toMatch(/unc/);
    expect(['banana', 'apple', 'strawberry']).toContain('apple');
  });
});
