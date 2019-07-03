var User = /** @class */ (function () {
    function User(_name) {
        this._name = _name;
    }
    User.prototype.sayHi = function () {
        console.log("hi! i am " + this._name);
    };
    User.prototype.showScore = function () {
        console.log(this.score);
    };
    Object.defineProperty(User.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: true,
        configurable: true
    });
    return User;
}());
var bob = new User('bob');
bob.sayHi();
