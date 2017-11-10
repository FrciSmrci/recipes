# RecipePuppy

## What is this repository for? 
Senior frontend developer tests for Carthook.

## The basic CS
The basic CS answers can be found at https://gist.github.com/FrciSmrci/d886d3cf8bc5b84cc4f1c4dff5b28c1d 

## 1 page high level description of my solution

I have built a project named RecipePuppy which main feature is enabling the user to search through the recipes by title or ingredients. 

I structured the project into three main folders => core, shared and feature in this case recipe-list. The core holds the CoreModule
which gathers all app-wide singleton providers in a single module which you should import once when the app starts and never again anywhere else. 

First sub folder inside the core is data and it contains the rest helper service which holds the serverUrl, exports the generateGuid function in the
advanced implementation it would have methods like handleError as well.
Second sub folder is recipe which contains the recipe model, recipe service, service mock and test.
More on the recipe service implementation will be described in Infinitive scroll section.

The shared section has the shared module with which we can reduce the repetition by re-exporting CommonModule and FormsModule so that importers of SharedModule 
get CommonModule and FormsModule for free as well as any other modules we want to use everywhere. It has also the ListItem model which is generic and can be used 
everywhere in the application for list view purposes.

The last section is the feature folder which represents an feature module and has its own routing module as well. Inside this module everything that is imported and declared
is specific to the feature except SharedModule. Inside the feature routing module I declared the path, component and the router ResolveGuard. 
With the ResolveGuard I'm prefetching the data so the rendering experience is more smooth for the user.

For the components search implementation I have used Reactive forms provided by Angular. I decided to create a search form group with two form controls
=> recipeSearch and ingredientSearch. In the initialization of the component I first subscribe to value changes of the whole form group. I added the debounceTime operator 
with 300 miliseconds as well as distinctUntilChanged operator so the calls will not fire too often. Then I used switchMap operator which is a real life saver when 
it comes to handling http requests, because it discards all of the previous ongoing calls and keeps the last one. Inside switchMap I call getListItemsByBatch method
which fetches the data from the server and maps the results into ListItem models. After that I subscribe to the search results as well and set the listItems component property 
with the received result.

Instead of the pagination approach I decided to use Infinitive scroll, after researching the topic I came to a conclusion it helps the user to be more engaged and
keeps him "hooked" for a longer timespan. Because of the specific API provided which offers the pagination approach I had to come up with a solution that will fit my needs. 
I decided to implement a method on the component called getListItemsByBatch which takes the batch number and calls the recipe service getResults method with value 
for recipe search, ingredient search and batch number (if the number is not provided the default is set to one).

Inside the getResults the private getRecipesByBatch method is called twice, first time with the provided batch number and second time with increased batch number by 1. 
When the results are mapped to Recipe models the batch number is saved on their batch property, so it can later be used for infinitive scroll implementation requirements. 
After the mapping on each batch the results are joined with the forkJoin operator and returned.

For the translations I used the ngx-translate which is heavily supported and developed. 

Every desicion I made was with clean code in mind. I tried to write it decoupled, dry and with a single responsibility principle in mind.
The app structure is based on Angular team proposal and the code style is following the TypeScript guidelines as well which can be found at 
https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines. 

## How to run development server?
1. git clone https://bitbucket.org/FrciSmrci/recipe-puppy.git
2. npm install -g @angular/cli
3. cd recipe-puppy
4. npm install
5. Add Allow-Control-Allow-Origin: * plugin to Chrome found at => https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en
6. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Project
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.2.

## Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
