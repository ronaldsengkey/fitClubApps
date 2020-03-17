ddresses you would like to whitelist

```js
    var Ddos = require('ddos');
    var ddos = new Ddos({whitelist:['74.125.224.72', '216.239.63.255']});
```

Whitelisted IP's bypass all table checks. If the address in question is in IPV6 form, simply enable testmode

```js
    var ddos = new Ddos({whitelist:['74.125.224.72', '216.239.63.255'], testmode:true});
```

and see the exact form of the address you want to whitelist. See this [link on stackoverflow about IPv6 addresses](http://stackoverflow.com/questions/29411551/express-js-req-ip-is-returning-ffff127-0-0-1)

### .addWhitelist(ip)

Update whitelist while running.

```js
    ddos.addWhitelist('74.125.224.72')
```

### errormessage

When a request is denied, the user receives a 429 and the error message.

### responseStatus

By 