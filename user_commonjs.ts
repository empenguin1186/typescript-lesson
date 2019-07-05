export class User {
    constructor(private _name: string, private _age: number) {

    }
    get name(): string {
        return this._name;
    }
    get age(): number {
        return this._age;
    }
    set name(name: string) {
        this._name = name;
    }
    set age(age: number) {
        this._age = age;
    }

}