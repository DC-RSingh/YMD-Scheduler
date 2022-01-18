# YMD-Scheduler

Your Music Depot Scheduler (YMD-Scheduler) is a desktop application meant to help a small music store keep track of their music classes, staff and students. You can read more about it by consulting the [business case](https://github.com/DC-RSingh/YMD-Scheduler/blob/main/CASE.md), which was the original case that prompted
the development of this project. More requirements were gathered throughout the semester in order to create an app that would be tailored to their need.

This app was created for [DBAS 6206](https://durhamcollege.ca/programs-and-courses/courses?subj_code_in=DBAS&crse_numb_in=6206&semester_in=SEM5), a course offered at Durham College in the [Computer Programming and Analysis program](https://durhamcollege.ca/programs/computer-programming-analyst-three-year).

> Many parts of it still WIP, Scheduling is incomplete

![Preview GIF](https://i.imgur.com/NWDqOGi.mp4)

## Contents

- [YMD-Scheduler](#ymd-scheduler)
  - [Contents](#contents)
  - [Tech Stack](#tech-stack)
  - [Installing for Development](#installing-for-development)
    - [Requirements](#requirements)
    - [Getting Started](#getting-started)
  - [Download](#download)
  - [Documentation](#documentation)
  - [Acknowledgements](#acknowledgements)
  - [License](#license)

## Tech Stack

The technologies used to create this project:

- Electron 15.2.0
- React 17.0.2
- Mobx 6.3.8
- Prisma 3.6.0
- SQLite3 5.0.2
- Electron-Forge 6.0.0-beta.61
- Node.js v14.15.3 (We recommend the latest LTS)
- npm 8.1.0 or yarn 1.22.17 (We recommend latest versions of each)

## Installing for Development

### Requirements

- Node.JS v14.5.3 or greater (use LTS)

> NOTE: the project has not been tested with versions below Node 14.15.3 and has been confirmed not to work with node versions 12.x.x. Using the latest LTS should work, but falling back to 14.15.3 is your best bet if you run into problems because of your node version.

- Node Package Manager or Yarn (both lockfiles are provided)
- [node-gyp](https://github.com/nodejs/node-gyp) requirements.
  - See relevant stackoverflow issues
    - [Error Installing with NPM](https://stackoverflow.com/questions/21365714/nodejs-error-installing-with-npm)
    - [Could not find any Python Installation to use](https://stackoverflow.com/questions/59470406/how-to-solve-could-not-find-any-python-installation-to-use-with-docker-node-al)
  - If all else fails, install Python.

> NOTE: The project does not directly use node-gyp, you do not need to have it installed globally on your machine. What is required are the dependencies of the node-gyp detailed in its repository for each operating system. The project uses Electron-Forge which uses Electron-Rebuild which uses node-gyp to build the native modules required for the project.

### Getting Started

- With NPM

```bash
npm install
npm start
```

- With Yarn

```bash
yarn install
yarn start
```

The node_modules file is upwards of 1.2 GB large after installation, so make sure you install it in a location that has sufficient space. We are working to reduce package bloat, but it's Node so not much to be done there 😅. Installation can take a while, so do not worry if it seems like nothing is happening when you install.

> NOTE: The postinstall script sets up a database and seeds it, of which the seeding can take minutes to do (3-8 minutes based on testing). If you do not wish to seed your database, scrap the `npx prisma db seed` part of the postinstall script.

## Download

The project is currently not in a state to build and package for production (has not been tested in that environment), so for now
you have to follow the instructions at [Installing for Development](#installing-for-development).

## Documentation

A docs folder will be created soon detailing the project's api and project structure, for now all documentation is in-line.

## Acknowledgements

- [Viktor Gullmark](https://github.com/viktorgullmark) and the rest of the [Exilence-Next Contributors](https://github.com/viktorgullmark/exilence-next/graphs/contributors) for their great API, UI and project structure that this work uses. If you play PoE you should check out [their work](https://github.com/viktorgullmark/exilence-next) and [support them](https://www.patreon.com/exilence) if you can!
- [Stackoverflow](https://stackoverflow.com/) and GitHub issues  and their users for existing, debugging would be near impossible without other programmers who endured the same suffering!

## License

This work is licensed under the Creative Commons Attribution-NonCommercial-ShareALike 3.0 Unported license. You can view the license and human-readable summary of it on the [Creative Commons webpage](https://creativecommons.org/licenses/by-nc-sa/3.0/) for the license.
