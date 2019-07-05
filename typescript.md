
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
```TypeScript
class User {

}

console.log('hello world.');
```
コンパイル
```
tsc main.ts
```
main.js
```JavaScript
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
console.log('hello world.');
```
将来TSを使用しなくなったとしてもJSファイルをメンテナンスしていけばいいため、乗り換えが比較的コストが低い

## 実行結果
```
$ node main.js
hello world.
```

# 静的型付けをしてみよう
JS -> 動的型付け (変数に違う型のデータを代入しても問題ない仕様)

TS -> 静的型付け (変数定義したのちに異なる型のデータを代入することができない)

// 以下はJSでは問題なく動作するが静的型付け言語ではエラーが発生する

```TypeScript
var x = 10;
x = "hello";
```
## エラー内容
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
```TypeScript
var i: number = 10;
var i = 10;
```

以下はany型で定義(any は何の型でも入れられる)
```TypeScript
var x;
x = 10;
x = "hello";
```

配列の定義
```TypeScript
var results: number[];
results = [10, 5, 3];
```

# 列挙型

```TypeScript
Signal
enum Signal {
    Red = 0,
    Blue = 1,
    Yellow = 2
}
```

```TypeScript
何も設定していないと0からの連番となる
enum Signal {
    Red, // 0
    Blue, // 1
    Yellow // 2
}
```

## サンプルコード
```TypeScript
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

## 実行結果
```
tsc main.ts
node main.js
5
```

上記の(a) のenum に既存のBlueを追加するとコンパイルエラーが発生する

```TypeScript
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
```TypeScript
function add(a: number, b: number): number {
    return a + b;
}

console.log(add(1, 2));
```

返り値が存在しない場合はvoid

引数をオプションにしたい場合は変数の後ろに？をつける
```TypeScript
function add(a: number, b?: number): number {
    return a + b;
}

console.log(add(1, 2));
```
オプションでつける変数の後に必須の引数を追加することは不可能
```
function add(a?: number, b: number): number { // 不可能
```

## サンプルコード
```TypeScript
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

## 実行結果
```
$ node main.js
8
10
```

関数の引数に初期値(デフォルト値) を使用することも可能
```TypeScript
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

## 実行結果
```
$ node main.js
8
15
```

# 関数式を使ってみよう

関数式とは式のように関数をかけることができる機能でJSにも提供されている

従来の関数式
```TypeScript
var add = function(a: number, b: number): number {
    return a + b;
}

console.log(add(3,5));
```

TSではアロー関数というものを使ってもっと簡単にかける
```TypeScript
var add = (a: number, b: number): number => a + b;

console.log(add(3,5));
```

# オーバーロードを使ってみよう
TSはJavaのようにオーバーロードの機能が備わっている

## サンプルコード(同名＆引数の数も同一の関数を用意して引数の型で処理を変更する)
```TypeScript
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
```TypeScript
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

```TypeScript
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

```TypeScript
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

```TypeScript
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

## サンプルコード
```TypeScript
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

## 実行結果
```
$ tsc main.ts -t ES5; node main.js
my age: 23
my name: Bob
```

# 静的メンバを使ってみよう
メンバとはそのクラスで定義されているフィールドとメソッドのことを指す
静的メンバとはインスタンス単位で保持しているメンバではなくクラス単位で保持しているメンバのことを指す

## 静的メンバ(フィールド)
## サンプルコード. 以下はインスタンスが何個生成されたかを静的メンバであるcountフィールドで保持している。
```TypeScript
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

## 実行結果
```
tsc main.ts -t ES5; node main.js
hi! i am Bob
hi! i am Tom
current count: 2
```
ちゃんとcountが2となっていることが確認できる

## 静的メンバ(メソッド)

## サンプルコード
```TypeScript
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

## 実行結果
```
tsc main.ts -t ES5; node main.js
this class is about User
```

# インターフェースを使ってみよう

コードを書いていく上で自分で定義した型を使用したい場合はインンターフェースを利用する

## サンプルコード
```TypeScript
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
## サンプルコードでresultにはaとbに加えインターフェースでは定義されていないcというプロパティが存在しているが、getTotal関数の引数にしても問題なく動作する。

## 実行結果
```
$ tsc main.ts -t ES5; node main.js
90
```

# インターフェースを継承してみよう

TSにおいてクラスは一つしか継承できないが、インターフェースは複数継承することが可能。
また、インターフェースのプロパティをオプションにすることも可能で、そうする場合はプロパティに?をつける。

## サンプルコード
```TypeScript
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
     final: 82 // finalが定義されていないと## 実行結果は90となる
 };

console.log(getTotal(result));
```

## 実行結果
```
$ tsc main.ts -t ES5; node main.js
172
```

# インターフェースを実装してみよう

Javaと仕様は同じで、インターフェースを実装する場合はかならず定義されているメソッドを実装する必要がある。
インターフェースを複数実装する場合はJavaと同じくカンマ区切りで列挙する。

## サンプルコード
```TypeScript
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

## 実行結果
```
$ tsc main.ts -t ES5; node main.js
0
```

# ジェネリクスを使ってみよう

同じ処理だが、引数の型が異なる関数をまとめて定義したいとなった時に、ジェネリクスを使用すると実現できる。
Any型であらゆる型に対応できればいいのではないかと一見思われるが、ジェネリクスを使用すると返り値の型を指定できるので扱いやすいというメリットが存在する。

## サンプルコード
```TypeScript
function getArray<T>(value: T): T[] {
   return [value, value, value];
}

console.log(getArray<number>(3));
console.log(getArray<string>("Hello"));
```

## 実行結果
``` 
[ 3, 3, 3 ]
[ 'Hello', 'Hello', 'Hello' ]
```

# ジェネリクスに制約を与えてみよう

クラスのメンバにもジェネリクスを使用することができる

## サンプルコード
```TypeScript
class MyData<T> {
   constructor(public value: T) {}
   getArray(): T[] {
      return [this.value, this.value, this.value];
   }
}

var v1 = new MyData<string>("hello");
console.log(v1.getArray());
var v2 = new MyData<number>(234);
console.log(v2.getArray());
```

## 実行結果
```
[ 'hello', 'hello', 'hello' ]
[ 234, 234, 234 ]
```

またジェネリクスに制約を課すことも可能で、例えば特定のフィールドを持っていることを強制したりできる

## サンプルコード
```TypeScript
interface Result {
   a: number,
   b: number
}

interface FinalResult {
   a: number,
   b: number,
   c: number
}

class MyData<T extends Result> {
   constructor(public value: T) {}
   getArray(): T[] {
      return [this.value, this.value, this.value];
   }
}

var v3 = new MyData<Result>({a: 32, b: 16});
console.log(v3.getArray());

var v4 = new MyData<FinalResult>({a: 32, b: 16, c: 23});
console.log(v4.getArray());
```

ここでは `new MyData<string>` でインスタンスを生成しようとするとエラーが発生する。

## エラー内容
```
main.ts:13:21 - error TS2344: Type 'string' does not satisfy the constraint 'Result'.

13 var v1 = new MyData<string>("hello");
```

継承元の`Result`や`Result`のメンバを使用している`FinalResult`を型に指定するとインスタンスを精製することができる。

## 実行結果
```
[ { a: 32, b: 16 }, { a: 32, b: 16 }, { a: 32, b: 16 } ]
[ { a: 32, b: 16, c: 23 },
  { a: 32, b: 16, c: 23 },
  { a: 32, b: 16, c: 23 } ]
```

# 内部モジュールを使ってみよう

モジュールを使用する場合は以下のように記述する。

## サンプルコード
```TypeScript
module UserModule {
   export var name = "empenguin1186" // 1
   export module AddressModule {
      export var zip = "111-1111";
   }
}

console.log(UserModule.AddressModule.zip);

import addr = UserModule.AddressModule; // 2
```

1. コードでモジュールを使用したい場合は`export`修飾子を付加する。
2. モジュール名は短縮することが可能

## 実行結果
```
tsc user.ts; node user.js
111-1111
```

また、外部ファイルのモジュールを使用することも可能

## サンプルコード
```TypeScript
/// <reference path="./user.ts" /> // 1

console.log(UserModule.name);
console.log(addr.zip);
```

1. /// <reference path="読み込みたいモジュールファイルのパス" /> で外部ファイルのモジュールを使用することができる

## 実行結果
```
$ tsc main.ts --out all.js; node all.js // 1.
111-1111 //user.ts の実行結果
empenguin1186
111-1111 //main.ts の実行結果
```
1. `tsc main.ts` のみでは`main.js`と`users.js`の複数のファイルが生成されてしまう。`--out`オプションをつけることにより`all.js`に`main.js`と`users.js`の内容をまとめる。

# 外部モジュールを使ってみよう
コンパイルのオプション出力形式を変更することが可能

## 外部モジュールについて
以下の記事がわかりやすい
https://qiita.com/naoki_mochizuki/items/cc6ef57d35ba6a69117

要は従来のJSにはプログラムを処理の単位で切り分け、それを外部ファイルとして保存し外部から読み込むことで可読性を向上させるモジュール機能が存在しなかった。そこでモジュール機能を使えるように新たに定義された仕様が`CommonJS`だったり`AMD`だったりする。
TSではこの`CommonJS`と`AMD`の仕様に沿ったJSを生成することが可能

まずはCommonJS

## サンプルコード
```TypeScript
export var name = "empenguin1186"
```

```TypeScript
import User = require("./user_commonjs");

console.log(User.name);
```

## コンパイル
```shell
tsc main.ts -m commonjs
```
`-m`オプションで外部モジュールを使用できるようにする。今回は`CommonJS`を指定

## 生成されたコード
```JavaScript
"use strict";
exports.__esModule = true;
exports.name = "empenguin1186";
```

次にAMD
外部モジュールのコードはCommonJSと同じ

## サンプルコード

```TypeScript
export var name = "empenguin1186"
```

```TypeScript
import User = require("./user_amd");

console.log(User.name);
```

## コンパイル
```shell
tsc main.ts -m amd
```

## 生成されたコード
```JavaScript
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.name = "empenguin1186";
});
```

# 外部モジュールでクラスを読み込む

## サンプルコード

### user_commonjs.ts
```TypeScript
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
```

### main.ts
```TypeScript
import common = require("./user_commonjs");
import User = common.User;

var user = new User("empenguin1186", 26);
console.log(user.age);
```

## 実行結果
```
tsc main.ts -t ES5 -m commonjs; node main.js
26
```

# NEXT ACTION

TypeScript の QuickStart をやってみたい!
https://www.typescriptlang.org/samples/
