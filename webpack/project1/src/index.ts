type Person = { name: string; age: number; sex: boolean };
type Name = Omit<Person, 'name'>;
const bqc: Person = {
  name: 'bqc',
  age: 27,
  sex: true,
};
const qq: Name = {
  age: 27,
  sex: true,
};
console.log(bqc, qq);
