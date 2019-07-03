
# TypeScriptとは
- マイクロソフトが開発(オープンソース)
- TypeScript -> JavaScript
- 静的型つけ
- クラスベースのオブジェクト志向
- 公式サイト: www.typescriptlang.org

ローカルでのインストール方法
```
sudo npm install -g typescript
```

# 初めてのTS
拡張子 -> .ts

main.ts
```
class User {

}

console.log('hello world.');
```
コンパイル
```
tsc main.ts
```
main.js
```
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
console.log('hello world.');
```
将来TSを使用しなくなったとしてもJSファイルをメンテナンスしていけばいいため、乗り換えが比較的コストが低い

実行結果
```
$ node main.js
hello world.
```

# 静的型付けをしてみよう
JS -> 動的型付け (変数に違う型のデータを代入しても問題ない仕様)

TS -> 静的型付け (変数定義したのちに異なる型のデータを代入することができない)

// 以下はJSでは問題なく動作するが静的型付け言語ではエラーが発生する

```
var x = 10;
x = "hello";
```
エラー内容
```
main.ts:3:1 - error TS2322: Type '"hello"' is not assignable to type 'number'.

3 x = "hello";
  ~


Found 1 error.
```


# 様々な型を使ってみよう
型の種類はJavaと似ているが, 数値を扱う型は number となる

型の省略が可能

以下は同義
```
var i: number = 10;
var i = 10;
```

以下はany型で定義(any は何の型でも入れられる)
```
var x;
x = 10;
x = "hello";
```

配列の定義
```
var results: number[];
results = [10, 5, 3];
```

# 列挙型

```
Signal
enum Signal {
    Red = 0,
    Blue = 1,
    Yellow = 2
}
```

```
何も設定していないと0からの連番となる
enum Signal {
    Red, // 0
    Blue, // 1
    Yellow // 2
}
```

サンプルコード
```
// 部分的に番号を振っていると、それ以前は0からの連番、その番号以降はインクリメントされていく
enum Signal {
    Red,
    Blue = 3,
    Yellow
}
// 同一の名前をもつenumについては要素がマージされる結果となる。この場合、初期値を省略できるのはどちらか一方のみ
enum Signal { // (a)
    Green = 5
}

// 実行
var result: Signal;
console.log(Signal.Green);
```

実行結果
```
tsc main.ts
node main.js
5
```

上記の(a) のenum に既存のBlueを追加するとコンパイルエラーが発生する

```
enum Signal {
    Red,
    Blue = 3,
    Yellow
}

enum Signal {
    Green = 5,
    Blue = 2
}
```

コンパイルエラー
```
main.ts:18:5 - error TS2300: Duplicate identifier 'Blue'.

18     Blue = 3,
       ~~~~

main.ts:24:5 - error TS2300: Duplicate identifier 'Blue'.

24     Blue = 2
       ~~~~


Found 2 errors.
```

# 関数
function で関数を定義
```
function add(a: number, b: number): number {
    return a + b;
}

console.log(add(1, 2));
```

返り値が存在しない場合はvoid

引数をオプションにしたい場合は変数の後ろに？をつける
```
function add(a: number, b?: number): number {
    return a + b;
}

console.log(add(1, 2));
```
オプションでつける変数の後に必須の引数を追加することは不可能
```
function add(a?: number, b: number): number { // 不可能
```

サンプルコード
```
function add(a: number, b?: number): number {
    if (b) {
        return a + b;
    } else {
        return a + a;
    }
}

console.log(add(5, 3));
console.log(add(5));
```

実行結果
```
$ node main.js
8
10
```

関数の引数に初期値(デフォルト値) を使用することも可能
```
function add(a: number, b: number = 10): number {
    if (b) {
        return a + b;
    } else {
        return a + a;
    }
}

console.log(add(5, 3));
console.log(add(5));
```

実行結果
```
$ node main.js
8
15
```

# 関数式を使ってみよう

関数式とは式のように関数をかけることができる機能でJSにも提供されている

従来の関数式
```
var add = function(a: number, b: number): number {
    return a + b;
}

console.log(add(3,5));
```

TSではアロー関数というものを使ってもっと簡単にかける
```
var add = (a: number, b: number): number => a + b;

console.log(add(3,5));
```

# オーバーロードを使ってみよう
TSはJavaのようにオーバーロードの機能が備わっている

サンプルコード(同名＆引数の数も同一の関数を用意して引数の型で処理を変更する)
```
function add(a: number, b: number): number;
function add(a: string, b: string): number;

function add(a: any, b: any): any {
    if (typeof a === 'string' && typeof b === 'string') {
        return a + " " + b;
    }
    return a + b;
}

console.log(add(5,3)) // 8
console.log(add("hello","world")) // hello world
```
ちなみにある関数の引数の集合をその関数のシグネチャと呼ぶ
また当然のように設定していない型の組み合わせでadd関数を呼び出すとエラーが発生する


# クラスを使ってみよう

クラスに関してはJavaっぽくかける
```
class User {
    
    public name: string;

    // コンストラクタ
    constructor(name: string) {
        this.name = name;
    }
    
    sayHi(): void {
        console.log("hi! i am " + this.name)
    }
}

var tom = new User("Tom");
console.log(tom.name);
tom.sayHi();
```
フィールドは何も設定していないとアクセス修飾子はpublicとなる

```
$ tsc main.ts; node main.js
Tom
hi! i am Tom
```

また、フィールドとコンストラクタの定義を一括で行うことができる記法が存在する

```
class User {
   constructor(public name: string) {}
    sayHi(): void {
        console.log("hi! i am " + this.name)
    }
}

var tom = new User("Tom");
console.log(tom.name);
tom.sayHi();
```

クラス内でフィールドを定義せずにコンストラクタ内でアクセス修飾子をつけて宣言するだけ

# getterやsetterを使ってみよう

private をつけると直接そのフィールドを参照することができない

```
class User {
   constructor(public name: string) {}
    sayHi(): void {
        console.log("hi! i am " + this._name)
    }
}

var tom = new User("Tom");
console.log(tom._name);
tom.sayHi();
```

エラー
```
$ tsc main.ts; node main.js
main.ts:41:18 - error TS2341: Property '_name' is private and only accessible within class 'User'.

41  console.log(tom._name);
                    ~~~~~


Found 1 error.

Tom
hi! i am Tom
```

privateのフィールドには頭にアンダースコアをつけるのが習わしらしい

privateフィールドを使用するにはJavaのようにGetterとSetterを定義する

```
class User {
    constructor(private _name: string) {}
     sayHi(): void {
        console.log("hi! i am " + this._name)
     }

     get name() { // Getter
        return this._name;
     }

     set name(name: string) { // Setter
        this._name = name;
     }
 }
 
 var tom = new User("Tom");
 console.log(tom.name);
 tom.name = "TOM";
 tom.sayHi();
```

しかし、これをコンパイルしようとすると、エラーが発生する。

```
$ tsc main.ts; node main.js
main.ts:39:10 - error TS1056: Accessors are only available when targeting ECMAScript 5 and higher.

39      get name() {
            ~~~~

main.ts:43:10 - error TS1056: Accessors are only available when targeting ECMAScript 5 and higher.

43      set name(name: string) {
            ~~~~


Found 2 errors.

Tom
hi! i am TOM
```

構文が比較的新しいものなので、このままコンパイルしようとするとES5を使用してくださいみたいなエラーが発生する
なのでオプションでES5を使用するようにするとコンパイルが成功する

```
$ tsc main.ts -t ES5; node main.js
Tom
hi! i am TOM
```

# クラスを継承させてみよう
TSにおけるクラス継承の方法はJavaと同じ
また、protected 修飾子に関しても、仕様はJavaと同じで子クラスでアクセス可能である

サンプルコード
```
class User {
    constructor(protected _name: string) {}
     sayHi(): void {
        console.log("hi! i am " + this._name)
     }

     get name() {
        return this._name;
     }

     set name(name: string) {
        this._name = name;
     }
 }

 class AdminUser extends User {
     private _age: number;
     constructor(_name: string, _age: number) {
         super(_name);
         this._age = _age;
     }
     public sayHi(): void {
         console.log("my age: " + this._age);
         console.log("my name: " + this._name)
     }
 }
 
 var bob = new AdminUser("Bob", 23);
 bob.sayHi();
```

実行結果
```
$ tsc main.ts -t ES5; node main.js
my age: 23
my name: Bob
```

# 静的メンバを使ってみよう
メンバとはそのクラスで定義されているフィールドとメソッドのことを指す
静的メンバとはインスタンス単位で保持しているメンバではなくクラス単位で保持しているメンバのことを指す

## 静的メンバ(フィールド)
サンプルコード. 以下はインスタンスが何個生成されたかを静的メンバであるcountフィールドで保持している。
```
class User {
    constructor(protected _name: string) {
        User.count++;
    }
     sayHi(): void {
        console.log("hi! i am " + this._name)
     }

     get name() {
        return this._name;
     }

     set name(name: string) {
        this._name = name;
     }
     static count: number = 0;
 }
 
 var bob = new User("Bob");
 var tom = new User("Tom");

 bob.sayHi();
 tom.sayHi();
 
 console.log("current count: " + User.count);
```

実行結果
```
tsc main.ts -t ES5; node main.js
hi! i am Bob
hi! i am Tom
current count: 2
```
ちゃんとcountが2となっていることが確認できる

## 静的メンバ(メソッド)

サンプルコード
```
class User {
    constructor(protected _name: string) {
        User.count++;
    }
     sayHi(): void {
        console.log("hi! i am " + this._name)
     }

     get name() {
        return this._name;
     }

     set name(name: string) {
        this._name = name;
     }
     static count: number = 0;
     static showDescription(): void {
         console.log("this class is about User");
     }
 }

 User.showDescription()
```

実行結果
```
tsc main.ts -t ES5; node main.js
this class is about User
```

# インターフェースを使ってみよう

コードを書いていく上で自分で定義した型を使用したい場合はインンターフェースを利用する

サンプルコード
```
// 構造的部分型
 interface Result {
     a: number,
     b: number
 }

 function getTotal(result: Result) {
     return result.a + result.b;
 }

 var result = {
     a: 32,
     b: 58,
     c: 60
 };

console.log(getTotal(result));
```

getTotal関数の引数はResultという自作したインターフェースを使用している。またTSのインターフェースは構造的部分型という手法を採用しており、ある型のプロパティを持ってさえすればその型であるとみなす仕組みが存在する。
サンプルコードでresultにはaとbに加えインターフェースでは定義されていないcというプロパティが存在しているが、getTotal関数の引数にしても問題なく動作する。

実行結果
```
$ tsc main.ts -t ES5; node main.js
90
```

# インターフェースを継承してみよう

TSにおいてクラスは一つしか継承できないが、インターフェースは複数継承することが可能。
また、インターフェースのプロパティをオプションにすることも可能で、そうする場合はプロパティに?をつける。

サンプルコード
```
 interface SpringResult {
     a: number
 }

 interface FallResult {
     b: number
 }

 interface FinalResult extends SpringResult, FallResult {
     final?: number;
 }

 function getTotal(result: FinalResult) {
     if (result.final) {
        return result.a + result.b + result.final;
     } else {
        return result.a + result.b;
     }
 }

 var result = {
     a: 32,
     b: 58,
     final: 82 // finalが定義されていないと実行結果は90となる
 };

console.log(getTotal(result));
```

実行結果
```
$ tsc main.ts -t ES5; node main.js
172
```

# インターフェースを実装してみよう

Javaと仕様は同じで、インターフェースを実装する場合はかならず定義されているメソッドを実装する必要がある。
インターフェースを複数実装する場合はJavaと同じくカンマ区切りで列挙する。

サンプルコード
```
interface GameUser {
    score: number;
    showScore(): void; // void型のメソッドshowScoreを実装することをクラスに強制する
}

class User implements GameUser {
    score: number = 0;
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
bob.showScore();
```

実行結果
```
$ tsc main.ts -t ES5; node main.js
0
```