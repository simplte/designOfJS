declare type Person = {
    name: string;
    age: number;
    sex: boolean;
};
declare type Name = Omit<Person, 'name'>;
declare const bqc: Person;
declare const qq: Name;
