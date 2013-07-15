
Backbone Node Mongo Template
====================

This is based off of tbranyen's excellent backbone boilerplate.

Stack: Node.js, MongoDB, Backbone, Mocha, Twitter Bootstrap,

Checkout the Backbone Boilerplate documentation here:
[GitHub Wiki](https://github.com/tbranyen/backbone-boilerplate/wiki)

## Getting started ##


The easiest way to get started is to install Git and clone the repository:

``` bash
# Create a new project directory and enter it.
mkdir myproject && cd myproject

# Using Git, fetch only the latest commits.  You won't need the full history
# for your project.
git clone --depth 0 git@github.com/LemmiwinksNO/bbnm-template.git .
```

You will need to download and install [Node.js](http://nodejs.org/) if you want
to use the commands in the following sections.

## Updating dependencies ##

Third party packages may update independently from this main repo, so it's a
good idea to update after fetching.  There are two different package managers
that you need to install and call update on.

``` bash
# Install latest Grunt & useful Grunt plugins.
npm install

# Install Jam and Bower.  Depending on your user account you may need to gain
# elevated privileges using something like `sudo`.
npm install jamjs bower -g

# Updating the JamJS packages.
jam upgrade

# Updating the Bower packages.
bower update
```

## Build process ##

The build process consists of numerous Grunt plugin tasks that work together
to optimize your application.

``` bash
# Make sure you install grunt-cli globally.  Depending on your user account you
# may need to gain elevated privileges using something like `sudo`.
npm install grunt-cli -g

# To test the build process works, do the following.
grunt release
Go into dist/release/views/footer.jade and make sure the script tag points to /source.js.
node server.js production

```