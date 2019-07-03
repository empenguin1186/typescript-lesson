interface GameUser {
    score: number;
    showScore(): void;
}

class User implements GameUser {
    score: number;
    constructor(protected _name: string) {}
     sayHi(): void {
        console.log("hi! i am " + this._name)
     }

     showScore(): void {
         console.log(this.score);
     }

     get name() {
        return this._name;
     }

     set name(name: string) {
        this._name = name;
     }
}

var bob = new User('bob');
bob.sayHi();