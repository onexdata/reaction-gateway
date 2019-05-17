# Reaction Gateway
Simple "just let me develop" API gateway for your enterprise platform with loads of built-in tools
everybody needs!

# Installation

`
npm i @acter/gateway
`

# Getting Started

`
const gateway = require('@acter/gateway')
`

This will create a gateway and setup endpoints for healthchecking (fully Kubernetes or other orchistrator compatible).

It will also setup common app defaults and an authorization platform (uses [passport](http://www.passportjs.org/), so you'll be able to auth users using user/pass, JWT, Facebook, Google, you name it, you got it).  user/pass and JWT are installed by default since just about everyone uses them.

Passport [supports over 500 authorization mechanisms.](http://www.passportjs.org/packages/)

# Configuration
Create a /config folder in the root of your project containing a file named **default.js**

## Defaults
```javascript
module.exports = {
  server: {
    // By default, will try port 8000 and use the next available, override here.
    port: 8000,
    // By default, will use your package.json version, but you can override here.
    version: '0.6.9',
    // Default will output fancy "Acter". Override here.
    logo: require('pathToYourLogoString'),
    // The datasource
    persistence: 'mysql://root:Makeitso1@localhost/admin',
    // If we're hosting static files or not.
    statics: {
      host: false,
      endpoint: '/remote'.
      folder: 'statics' // The root of your source file + /statics
    }
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
```

# Connecting your data


# Other config options

## server.statics
The gateway can automatically host static files (like Apache/nginx, although a tiny bit simpler and less optimized) :). Express is under the hood for this.

**Default**

```{ active: false, folder: 'statics, endpoint: '/remote }```

**active**: True if you want to host static resources (like index.html).

**folder**: The relative path to the folder you want to host.

**endpoint**: The endpoint you want to serve the static files out of. '/' for root, but will mess with your services.

---
## server.watch
The gateway can automatically watch folders for changes and send results to a script you specify. Implement advanced things like updating a UI when a file is uploaded, etc.

**Default**

```{ active: false, folder: undefined, report: undefined }```

**active**: True if you want to watch a folder.

**folder**: The ***full*** path to the folder you want to watch.

**report**: The script that will recieve reports on your watched folder.

### Report script.
Your report script path can be relative. It will be called as a function and passed an object containing:

```javascript

{
  app,     // The app object, which lets you attach hooks or call any service
  watcher, // The watcher bus. More on this below
  config,  // The complete config for the gateway
  util     // The gateway util (helper functions) object
}

```
The watcher bus is an event bus that will trigger the following events:

* ready: You get this event when all the structure in the watched folder have been reported.
* add: Triggered when a file is added to a watched folder.
* unlink: Triggered when a file is removed from a watched folder.
* addDir: Triggered when a folder is added to a watched folder.
* unlinkDir: Triggered when a folder is removed from a watched folder.
* error: Triggered when something goes wrong.

All events will be passed the path/file that changed except for **ready** which passes nothing, and **error** which passes an error object.

**NOTE for Windows users:** The Windows OS will report an error when watching "unlinkedDir" because of a quirk in the underlying implementation. NodeJS does not account for this or allow for a way to account for this (as of 3/1/2019). Because of this, **this issue cannot be cleanly addressed automatically by Acter**.

If you want to watch unlinkedDir on a Windows machine, add a trigger for error and handle it like so...
```
        watcher.on('error', error => {
            // Ignore EPERM errors in windows, which happen if you delete folders...
            if (error.code === 'EPERM' && require('os').platform() === 'win32') return 
            // Otherwise, display the error...
            console.log(error)
        })
```

This issue does not exist on Mac or Linux OSes.

**Example watch report script...**
```javascript
module.exports = ({app, watcher, config, util}) => {
  watcher.on('ready', () => {
      // Can watch these events too: add, unlink, addDir, unlinkDir, error
      watcher.on('add', async path => {
        // As an example, get the total server memory percent used, and which file changed...
        const stat = await app.services.status.find()
        console.log(`(Mem used: ${stat.system.memory.percentUsed}). A new file has been uploaded: "${path}"`)
      })
  })    
}

console.log('Watcher script setup completed.')
```



### server.port
**Default**

```{ from: 8000, to: 8999 }```

If you specify a **number**, the server will not start unless that port is free.
If you specify a range using an object with "from" and "to" variables (i.e. ```{ from: startingPort, to: endingPort }```), the server will find the
first free port within that range.  The port that was chosen will be
available to your application using **config**.server.port

### server.mode
**Default**

```http```


If you specify 'https', the server will also expect a ```key``` and ```cert``` value that point to valid respective files.
That's all you need to activate HTTPS. If you enable HTTPS, WebSocket will also operate in WSS automatically,
making your entire connection secure. You cannot listen to HTTP and HTTPS at the same time for security reasons. If you want to do this,
fire up a second gateway. We feel it's so important to isolate HTTP/HTTPS traffic that we don't believe you should mix code running in both.


# Technical details

## Entry point
Acter logic starts at src/index.js
The logo is drawn, configuration is loaded, and the platform is started.
