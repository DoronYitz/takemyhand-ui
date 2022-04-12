# takemyhand-ui

## Main parts
Takemy& project, includes 3 main parts: 
- Public part - which includes landing page, registeration and login page
- Driver's panel - include a driver panel, where he can see and change the status for his parcels that he is delivering
- Admin's panel - include a fully featured admin panel, with a smart control panel to view the active event parcels' statuses on live.

## Modules 
- Layout module - includes all components and features modules: 
  - Home module - include public part
  - User panel module - include driver's panel
  - Admin panel module - include admin's panel
- Shared module - includes all shared modules like CommonModule and FormsModule of angular, other directives and components
- Core module - includes all core services, and layout modules.

## Settings

```
Angular 12.2.10
npm 8.5.0
```

## Development server

Run `npm i` after cloning the project.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--configuration production` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
