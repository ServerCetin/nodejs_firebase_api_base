# nodejs_firebase_api_base

I wanted to share my API base for nodejs, express, firebase projects.

## Table of Contents
1. [How to run](#how-to-run)
2. [Overview](#overview)
3. [Configuration and Initialization](#configuration-and-initialization)
5. [API Documentation](#api-documentation)
6. [TODO](#todo)

## How to run

1. Create a [Firebase project](https://console.firebase.google.com/)
2. [Install & set up Firebase](https://firebase.google.com/docs/functions/get-started) in your environment
3. Move files in functions to your firebase functions
4. Install packages: npm i
5. Run firebase emulator: firebase emulators:start
6. Deploy your progress: firebase deploy --only functions

## Overview

* This api contains only one model: user
* User can CRUD users

## Configuration and Initialization

Only configuration we need to do is firebase configurations. It will appear when we set our firebase in our environment.
There will be no need to configure anything else for now.

## API Documentation 
You can take a look at [Postman API Docs](https://www.postman.com/gold-meteor-930354/workspace/nodejs-firebase-express-api-base/overview).

## Contribute

You can contribute the project if you want :)

## TODO
- Role granted actions
- At least one more model
- Sorting algorithm fix
- ...
