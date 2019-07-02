
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

クラス内でフィールドを定義せずにコンストラクタ内ででアクセス修飾子をつけて宣言するだけ