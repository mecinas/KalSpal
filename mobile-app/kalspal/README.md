# KalSpal
## _Eat, Sleep, Run, Repeat_

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

KalSpal help users track their fitness and health statistics. This project consists of a website and mobile application.
It is worth mentioning that this project would be too hard for solo development, so we are **working in a team** to successfully deliver it. This part is a mobile application for KalSpal, which will work on both Android and iOS phones.

## Features
- Login to KalSpal system
- Login with Auth0 to KalSpal system
- Show informations about the user
- Record user workout
- Upload workout to KalSpal system



## Tech
**Flutter**, **Dart** (also a bit of **Java** and **Swift**) were used to create the project.
In addition, the following Dart packages were used:
- [**cupertino_icons**] - default icons asset for Cupertino widgets,
- [**http**] - API for handling HTTP requests,
- [**flutter_appauth**] - helpful during auth0 integration,
- [**flutter_secure_storage**] - useful for storing data securely on both ios and Android,
- [**location**] - get realtime location of a user in iOS and Android,
- [**flutter_dotenv**] - helpful for handling .env files,
- [**gpx**] - useful for handling GPS data in GPX format.

This mobile app would be useless without KalSpal API that helps mobile app to integrate and communicate with the KalSpal central system.
https://github.com/mecinas/KalSpal/tree/backend


## Launching
Anyone can install and test this application on their own.
Just plug in your mobile device, make sure that You are in the **mobile-app/kalspal** folder, then run:
```sh
flutter run
```


## License
MIT
