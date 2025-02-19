import { Person } from "./person.model"

fdescribe('Test for person',()=>
  {
    let person: Person;
    beforeEach(()=>{
      person = new Person('Jessica', 'Payano', 24 , 52 , 1.53 );
    })

    it('attrs', ()=> {
      expect(person.name).toEqual('Jessica');
      expect(person.lastName).toEqual('Payano');
      expect(person.age).toEqual(24);
      expect(person.weight).toEqual(52);
      expect(person.height).toEqual(1.53);
    } )

    describe('Test for calcIMC', ()=>{
      it('Should return a string: not found',()=>{
        person.weight = -70;
        person.height = 1.75;
        const rta = person.calcIMC();
        expect(rta).toEqual('not found');
      })
      it('Should return a string: down',()=>{
        person.weight = 50;
        person.height = 1.75;
        const rta = person.calcIMC();
        expect(rta).toEqual('down');
      })
      it('Should return a string: normal',()=>{
        person.weight = 60;
        person.height = 1.75;
        const rta = person.calcIMC();
        expect(rta).toEqual('normal');
      })
      it('Should return a string: overweigth',()=>{
        person.weight = 78;
        person.height = 1.75;
        const rta = person.calcIMC();
        expect(rta).toEqual('overweigth');
      })
      it('Should return a string: overweigth level 1',()=>{
        person.weight = 85;
        person.height = 1.75;
        const rta = person.calcIMC();
        expect(rta).toEqual('overweigth level 1');
      })
      it('Should return a string: overweigth level 2',()=>{
        person.weight = 95;
        person.height = 1.75;
        const rta = person.calcIMC();
        expect(rta).toEqual('overweigth level 2');
      })
      it('Should return a string: overweigth level 3',()=>{
        person.weight = 130;
        person.height = 1.75;
        const rta = person.calcIMC();
        expect(rta).toEqual('overweigth level 3');
      })
    })
  })
