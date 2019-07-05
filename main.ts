import common = require("./user_commonjs");
import User = common.User;

var user = new User("empenguin1186", 26);
console.log(user.age);