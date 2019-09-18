# Reaction Gateway
Simple "just let me develop" API gateway for your enterprise platform with loads of built-in tools
to take your idea to production in no time!

Although reaction gateway is in pre-release, it is already used in production and hosting millions of connections per day around the world.

# TL/DR;
Read the **installation** and **getting started** sections. This gateway comes pre-configured to just work out of the box, but read the **configuration** section to setup things you want to achieve in seconds, then you'll want to check out the services section and build your first service, and maybe try out some pre-built services like **status**.


# Executive summary
Reaction gateway is a new Open Source version of a powerful API gateway framework built by a 20 year veteran software architect and an expert Node developer. This gateway, or derivitives of it, power backends used at many large companies including Comcast, ESPN, Disney, and many hospitals, legal firms and startups.

This is being released into the community because many companies I work with want to move other platforms they have into gateways but do not know where to begin, and most existing gateways have a high learning curve.

Reaction gateway is designed to provide you will the tools you need to build an instant backend so you can start developing a killer app immediately.  However, it comes with enough juice and foresight to also provide you with a clear path to take your backend to planet scale and beyond (you could stick with this gateway and power a billion connections per second using an orchistrator like [Kubernetes](https://kubernetes.io/)).

If you aren't currently using an API Gateway, you NEED to be using an API Gateway.

## What's a gateway?
An API Gateway (which this is), centralizes many things developers realized they needed to do in a modern backend into one neat and easy place. They also provide an [API](https://en.wikipedia.org/wiki/Application_programming_interface) into your platform, allowing your app to speak with any other app using a single platform component.

Because gateways house modular pluggable components, further platform components can be adapted as platform [aspects](https://en.wikipedia.org/wiki/Aspect-oriented_programming). Aspect Oriented Programming (AOP), and it's cousin, the [mixin](https://en.wikipedia.org/wiki/Mixin) has torn through the developer community, leaving a much better design in the wake of everywhere it travels.  Therefore, API gateways bring this style of thinking to the platform layer, or top-most layer, where it certianly belongs.

API Gateways are the future. If you don't believe me believe Google, who recently purchased Apigee (one of the first proponents of API Gateways) for [$625 million dollars](https://techcrunch.com/2016/09/08/google-will-acquire-apigee-for-625-million/).

A properly designed API Gateway can provide you with your entire platform minus your services, including all additional "aspects" of a platform that are usually bolted-on as after thoughts, making your platform much more robust, secure and stable.

After all, a platform is meant to support your application or idea, not choke it.  If you've ever developed a platform WITHOUT an API gateway, you noticed just how much you focus on your platform instead of your platform's intentions. This is bad. Let a gateway show you how your worries can melt away like a nice piece of chocolate.

## Gateway benefits

A gateway makes it very difficult to create God objects or monoliths, and very easy to develop microservices or modern FaaS/Lambda services. The gateway becomes your central and only interface into the world, and spreads work out through platform services, which the industry unanimously agrees is the best current design known.

### Query agregation
A gateway can also host modern aggregation logic like [GraphQL](https://graphql.org/), eliminating the slowdown caused by 20 or more API requests by your app just to load a single page (GraphQL can convert those 20 requests into a single request, and using the hydration pattern, you can make it zero requests).

### Platform features in one place
Gateways also greatly reduce the complexity of your backend by handling caching, auditing, logging, security, blacklisting, conversion, A/B testing, ETL and more in a single logical place. Ever wonder how AWS, GCP and Azure keep producing advanced and complex SaaS products like 2FA, AI and ML and iterate every month? They all use an API Gateway to separate concerns :)

### Protocols
Gateways, being the only interface to your platform, also allow users to connect using modern and faster protocols like [WebSocket](https://www.websocket.org/) without the large learning curve developers otherwise would get exposed to (sometimes referred to as "callback hell"). WebSocket, for example is an *application* protocol and was designed to replace HTTP. HTTP is actually a document protocol designed to host documents, not applications).

### Clean separation of concerns
What is more, a properly designed gateway can cleanly and logically divide your [SPA](https://en.wikipedia.org/wiki/Single-page_application) into a front-end and back-end, allowing you to deliver a correctly designed, lightning speed SPA that can be hosted at 1% of the cost using a much faster [CDN](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/) to provide static consumables.

Using a CDN for your front-end payload means you only have to focus on the complexity of a backend (frontend complexity is limited to development), and using a gateway, you can further reduce complexity to everything but simple services.

# Reliability and security
This gateway has been used on many products that:

* Support hundreds of thousands of connections at once using a single instance.
* Used behind a load balancer in a cluster of over 50 containers to house infinite connections on both GSP and AWS.
* It has been used to host **tens of billions** of records.
* It provides access to the half-terabyte legal database that powers openjurist.org, supplying millions of requests and approximately 1/3rd of all Wikipedia legal references.
* It is used by medical platforms to provide services for millions of patients.

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
Create a /config folder in the root of your project containing a file named **default.js**.

The gateway fully supports all of the rich standards introduced in [node-config](https://github.com/lorenwest/node-config).

## A word on folders
By default, and to speed up development, the gateway expects you to put your configuration in your /config folder, and your source code in your /src folder.
Creating a service is as simple as dropping a file into src/services and enabling it using config.

## Default settings
These are default settings and values. If you are going to use them, you have nothing to configure.
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
    persistence: 'datasource://user:pas@host:port/db',
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

Acter provides you with many datasources that you can interact with. Setup involves a simple, standard connection string:

### datasource://user:pas@host:port/db

Where:

* datasource is one of the following: 'mysql', 'mariadb', 'postgres', 'sqlite', 'sqlserver'.
* user is the username authorized for the datasource.
* pass is the password authorized for the datasource.
* host is an IPv4, IPv6 or FDQN (like google.com) that your datasource is located at.
* port is optional, and only needed if using a nonstandard port for your datasource type.
* db is the name of the database at the host you provided.

That's it! You now have full access to any datasource within your API gateway. This means you can stop worrying about WHICH datasource you use, and focus on your application. For example you could start an app with a simple sqlite datasource, and then when you expand, upgrade to MySQL, still further, you could expand to Postgres (Digital Ocean managed hosting, etc.) or MariaDB (Amazon Aurora, GCP, etc).

When you make the change on your datasource is totally up to you, and your source code will simply change a single line of configuration! :)

For details on how to create services and access them, exposing your data to the world, please take a look at the *services* section.

# Other config options

## server.statics
The gateway can automatically host static files (like Apache/nginx, although a tiny bit simpler) :). Express is under the hood for this.  The Gateway supports gzip compression, HTTP or HTTPS for your files. Everything you need to get you started without having to deploy an NGINX or Apache instance, or moving to a CDN.

**Default**

```{ active: false, folder: 'statics, endpoint: '/remote }```

**active**: True if you want to host static resources (like index.html).

**folder**: The relative path to the folder you want to host.

**endpoint**: The endpoint you want to serve the static files out of. '/' for root, but will use the same namespace as your services and may overlap or produce unintended results.

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
The logo is drawn, configuration is loaded, and the platform is started. Acter uses debug under the hood and starts with 'acter'.

## Logging
When your service executes ```console.log()``` statements it will prepend a date/timestamp and send it to standard out.  Use any service management strategy to output what it logs to files or datasources.

