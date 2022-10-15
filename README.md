# NrWeb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## netRink project structure

Each netRink suite is implemented as a standalone angular application, with all the applications being in one angular project.
This allows all the applications to share the same node modules and dependancies.

npm commands that target a specific project should be run with the option `--project=project_name`.

## Adding aplications to project

To add a new applcation or suite to a project, use the command
```bash
ng generate application suite_name --routing
```

## Building desktop apps with Electron

Before building a desktop app with electron for a particular project, change the pathname in `main.js` to the path of the project in the `dist` folder. Also change the target of the electron build command in `package.json` to the the respective project name.

## Production deployment checklist

* Uncomment prod api url and comment dev api url in `enviroments.ts` files in all suite applications.

* Uncomment prod cookie functions and comment dev cookie function at
```
projects/application/src/app/servics/custom-cookie/custom-cookie.service.ts
```