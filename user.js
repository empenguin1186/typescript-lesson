var UserModule;
(function (UserModule) {
    UserModule.name = "empenguin1186";
    var AddressModule;
    (function (AddressModule) {
        AddressModule.zip = "111-1111";
    })(AddressModule = UserModule.AddressModule || (UserModule.AddressModule = {}));
})(UserModule || (UserModule = {}));
console.log(UserModule.AddressModule.zip);
var addr = UserModule.AddressModule;
