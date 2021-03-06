hapi-kea-config
===============

Configuration manager for [hapi](http://hapijs.com) framework. It based on [kea-config](https://github.com/Pencroff/kea-config) manager. 
Main feature of this configuration manager is merging configuration files depending on Node.js environment,
support references to other keys and using templates with objects for complex string values.
It has perfect performance, fully tested (100% covered by tests).

####Quick example

#####Initialization and usage

```js
    configManager.setup('./config');
    // For process.env.NODE_ENV === 'development';
    configManager.get('web.port'); // 4343
    // For process.env.NODE_ENV === 'production';
    configManager.get('web.port'); // 7474

    // If you don't want to apply changes connected to environment
    // just use init method
    configManager.init('./config/main.conf.js');
    configManager.get('web.port'); // 3005
```

#####File ./config/main.conf.js

```js
    var config = {}
    
    config.web = {
        port: 3005,
        sessionKey: '6ketaq3cgo315rk9',
        paging: {
            defaultPageSize: 25,
            numberVisiblePages: 10
        },
        mongoDb: {
            username: 'dbUser',
            password: 'strongPassword',
            host: 'localhost',
            port: 27101,
            db: 'database'
        },
        propertyReference: {
            $ref: 'web.paging.defaultPageSize'
        },
        templateReference: {
            $ref: 'web.mongoDb',
            $tmpl: 'mongodb://{username}:{password}@{host}:{port}/{db}'
        }
    };
    
    module.exports = config;
```

#####File ./config/development.conf.js

```js
    var config = {}

    config.web = {
        port: 4343
    };

    module.exports = config;
``` 
#####File ./config/production.conf.js

```js
    var config = {}

    config.web = {
        port: 7474
    };

    module.exports = config;
``` 

## Installation

	npm install hapi-kea-config --save

## Usage

To install this plugin on your Hapi server, do something similar to this:

```js

    var Hapi = require('hapi');
    var server = new Hapi.Server();

    var pluginOptions = {
        confPath: './path-to-config-flies',
        decorateServer: true
    };

    server.register({ // for hapi >= 8.0.0 or use server.pack.register for hapi < 8.0.0
        plugin: require('hapi-kea-config'),
        options: pluginOptions }, function(err) {
        if (err) {
            console.log('error', 'Failed loading plugin: hapi-kea-config');
        }
    });

    // Usage in the code
    var configManager = server.plugins['hapi-kea-config'];
    if (configManager.has('web')) {
        var port = configManager.get('web.port');
    }
    // if decorateServer === true
    server.configManager.has('web.port'); // true

    // Usage references
    
    configManager.get('web.propertyReference'); // 25
    
    // Usage templates
    
    configManager.get('web.templateReference'); // 'mongodb://dbUser:strongPassword@localhost:27101/database' - string
    
```

## Plugin Options

#### `confPath`

`{string}` - path to folder with configuration files. Optional parameter.

#### `decorateServer`

`{boolean}` - should plugin decorate server object by configuration manager.

## Testing

 * `npm test` run tests

## Licens

MIT

