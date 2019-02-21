# Reaction Gateway
Simple "just let me develop" API gateway for your enterprise platform with loads of built-in tools
everybody needs!

## Getting started

`
npm i reaction-gateway
`

## Creating an app

`
const gateway = require('reaction-gateway')
`

This will create a gateway and setup endpoints for healthchecking (fully Kubernetes or other orchistrator compatible).

It will also setup common app defaults and an authorization platform (uses [passport](http://www.passportjs.org/), so you'll be able to auth users using user/pass, JWT, Facebook, Google, you name it, you got it).  user/pass and JWT are installed by default since everyone uses them.

Passport [supports over 500 authorization mechanisms.](http://www.passportjs.org/packages/)


## Configuration
Reactor is already configured by default, but you can override anything. See the defaults section
below for a list of defaults and what you can override.

### How to configure your app
Create a /config folder in the root of your project with a file named default.js

**default.js contents**
```
module.exports = {
  server: {
    // You can over-ride this if you want to hide which gateway you're running.
    name: 'Reactor',
    // You can over-ride this if you want to as well.
    version: '1.0.0',
    // By default, will try port 8000 and use the next available, override here.
    port: { from: 8000, to: 8999 },
    // You can override the logo as well. Use a string or a script that exports a string.
    logo: require('./inc/logo'),
    // Where the data from services comes from.
    persistence: 'sqllite://root:root@default.sqllite'
  },
  services: {
    defaults: {
      model: {
        freezeTableName: true
      },
      pagination: {
        default: 20,
        max: 1000
      }
    },
    definitions: {
      messages: { model: 'message', auto: true },  
    }
  }
}
```


### Defaults
Configuration is a snap!

Reactor comes with enough defaults so that you can just require it and be up and running.


```
module.exports = {
  server: {
    port: 3030, // By default, will try port 8000 and use the next available, override here.
    version: '0.1.1', // By default, will use your package.json version, but you can override here.
    logo: require('pathToYourLogoString'), // Default will output fancy "Reactor". Override here.
    persistence: 'mysql://root:Makeitso1@localhost/admin'
  },
  services: {
    defaults: {
      model: {
        freezeTableName: true
      },
      pagination: {
        default: 20,
        max: 1000
      }
    },
    definitions: {
      yourServiecName: {
        model: 'yourModelName',
        auto: true // If true, your service will be auto-generated based on your mode.
        config: {
          // Configuration you pass to your service.
        }
      }
    }
  }
}
`

### Config options

#### server.port
**Default**
{ from: 8000, to: 8999 }

If you specify a number, the server will not start unless that port is free.
If you specify a range using a { from: startingPort, to: endingPort }, the server will find the
first free port within that range.  The port that was chosen will be
available using config.server.port


## Technical details

### Entry point
You start at src/index.js
The logo is drawn, configuration is loaded, and the platform is started.
```