Devcarib
========

Software for empowering Caribbean developer communities.

# About

DevCarib is software developed to power the successor of the 
[Caribbean Developers][1] facebook group. It is named after the unique name 
used in the URL of the group which is a contraction of Developers Caribbean.

# Installation

This is a [Node.js][2] application meant to be deployed through git to PaaS
providers such as [Heroku][3] or [Dokku][4].

## Requirements

1. Access to a PaaS (ideal but you can run locally or proxy behind Nginx)
2. MongoDB v4
3. Node.js v16

## Setup

If deploying through a PaaS, the buildpack should take care of installing the
required dependencies. If not, run `npm install` in the root of the tree to 
install the required node dependencies.

Before the application can run successfully, you need to declare a few 
environment variables:

1. MONGO_URL                - The url to the MongoDB database to connect to.
2. SESSION_SECRET           - A unique string used in sigining the sesssion 
                              cookie.
3. ADMIN_EMAIL              - The email address of the administrator for the
                              application.
4. ADMIN_PASSWORD           - The password for the administrator.
5. ROOT_USER_EMAIL          - The email address of the root user.
6. ROOT_USER_NAME           - The name of the root user.
7. ROOT_USER_USERNAME       - The username of the root user.
8. ROOT_USER_PASSWORD       - The password of the root user.
9. PORT                     - The port to bind on (defaults to 2407).

# Usage

Once the application is setup, running is as simple as `npm start`. If you
declare environment variables in a `.env` in the root, this command will also
read them into the Node.js environment.

By default Devcarib binds to all interfaces as it is meant to run in a container.
Bare this in mind when running locally or outside of containers. Visit the
appropriate URL and port in your browser to access the application.

# Hacking

Devcarib is mostly TypeScript, built almost entirely on the Quenk Platform toolkit
including:

1. tendril        
2. wml            
3. wml-widgets
4. jouvert
5. potoo
6. dagen

Check out [Quenk][7] on github to learn more about those packages.

## Building

GNU Make is used to configure build and build dependencies. Just run make
in the root of the project and everything that needs to be built will be.

## Layout

The folders are as follows:

1. `src`            - contains code for background services and management tasks.
2. `app`            - each of the major feature modules reside here.
3. `packages`       - common project specific node modules serving as internal
                      libraries
4. `build`          - the src folder compiled down to JavaScript.

Each of the app folders have a similar structure and make use of `@quenk/dagen`
to generate some their packages and `@quenk/tdc` to build the configuration for
tendril. All of this is eventually turned to JavaScript during the build process.
The layout is as follows:

1. src              - Source code for the server component.
2. frontend         - Source code for the frontend end SPA(s).
3. packages         - Libraries and auto-generated libraries.
4. build            - The src folder compiled down to JavaScript.
5. schema           - Dagen JSON Schema definitions used to generate various
                      package libraries.

# License

Devcarib is the property of Quenk Technologies Limited and its source code
is made available under the Apache-2.0 license. Quenk Technologies and its
affiliates make no guarantee or warranty that this product is fit for use or
intended purpose.

By contributing code to this software you grant Quenk Technologies an unlimited,
irrevocable license to use your contribution for whatever purpose we see fit in
accordance with the terms of the Apache-2.0 license. You agree to indemnify us
of any claims that may arise from your contributions whether intentionally or
unintentionally.

Use of this software does not entitle anyone to support services of any kind
from Quenk Technologies unless explicitly agreed upon via formal contract.

[1]: https://www.facebook.com/groups/devcarib
[2]: https://nodejs.org
[3]: https://www.heroku.com
[4]: https://dokku.com
[6]: https://github.com/quenktechnologies
[7]: https://quenk.com
