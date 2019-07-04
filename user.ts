module UserModule {
   export var name = "empenguin1186"
   export module AddressModule {
      export var zip = "111-1111";
   }
}

console.log(UserModule.AddressModule.zip);

import addr = UserModule.AddressModule;