hapi-kea-config
===============

kea-config as plugin for [hapi](//hapijs.com).

More details about [kea-config](../kea-config)

## Installation

	npm install hapi-kea-config --save

## Usage

To install this plugin on your Hapi server, do something similar to this:

```js
var Hapi = require('hapi');
var server = new Hapi.Server();

var pluginOptions = {
    confPath: './path-to-config-flies'
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
```

## Plugin Options

#### `confPath`

`{string}` - path to folder with configuration files. Optional parameter.

## Testing

 * `npm test` run tests

## Licens

MIT

