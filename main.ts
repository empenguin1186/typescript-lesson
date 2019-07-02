// Signal
// enum Signal {
//     Red = 0,
//     Blue = 1,
//     Yellow = 2
// }

// 何も設定していないと0からの連番となる
// enum Signal {
//     Red, // 0
//     Blue, // 1
//     Yellow // 2
// }

// 部分的に番号を振っていると、それ以前は0からの連番、その番号以降はインクリメントされていく
// enum Signal {
//     Red,
//     Blue = 3,
//     Yellow
// }
// 同一の名前をもつenumについては要素がマージされる結果となる。この場合、初期値を省略できるのはどちらか一方のみ
// enum Signal {
//     Green = 5,
//     Blue = 2
// }

// var result: Signal;
// if (result === Signal.Yellow) {...}
// if (result === Signal['Yellow']) {...}

// console.log(Signal[2]);

class User {
    /*
    public name: string;
    constructor(name: string) {
        this.name = name;
    }
    */
   constructor(public name: string) {
}
    sayHi(): void {
        console.log("hi! i am " + this.name)
    }
}

var tom = new User("Tom");
console.log(tom.name);
tom.sayHi();