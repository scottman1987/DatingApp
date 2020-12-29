# DatingApp sample application for learning NET 5 API and Angular 11
To get the servers up and running:

cd client
ng serve

cd API
dotnet run
-OR-
dotnet watch run

## Lesson 2 - getting the software set up

Understanding and installing Node Version Manager:
https://joachim8675309.medium.com/installing-node-js-with-nvm-4dc469c977d9

When I switched to zsh shell, nvm, node, and ng commands all broke.

I pieced together something that seems to have worked.

1. At the CLI: nano ~/.zshrc
1. Add this code to the file 
```
export NVM_DIR="$HOME/.nvm"
[ -s "/usr/local/opt/nvm/nvm.sh" ] && . "/usr/local/opt/nvm/nvm.sh"  # This loads nvm
[ -s "/usr/local/opt/nvm/etc/bash_completion.d/nvm" ] && . "/usr/local/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
```
3. The truth is that I found this code related to nvm in the ~/.bash_profile file at the end. 
1. For some reason it seems that the brew installer doesn’t put anything into .zshrc file. Maybe it is because I just converted from bash to zsh
1. Quit the Terminal and restart

### GitHub location of source code files:
https://github.com/TryCatchLearn/DatingApp

### Using dotnet CLI to create new solutions and projects, etc.
* New solution - dotnet new sln. This will create a sln in the current folder, named based on the current folder, .sln
* New project - dotnet new webapi -o API. This will create a new project based on the webapi template, in the API directory. It will create the directory if not already in existence.
* Add new project to sln - dotnet sln add API

### Getting VS Code setup for the first time
* Go to extensions tab
  * C# extension by OmniCode
    * Allow it to add assets for Release and Debug builds
    * If missed, Shift+Command+P, and type “asset”, and should see the command to add assets
  * C# Extensions by JosKreative
  * Material Icon Theme by Philipp Kief
* In VS Code - File -> Auto Save checked “on”
* To hide folders (like obj and bin)
  * Command + , (comma) to get to settings
  * Type “exclude”
  * Add exclude directories: **/bin and **/obj
* Make sure “Compact folders” is un set
* Search for command path (Command+Shift+P, then type “path”). Add VS Code to terminal path so that code . works in terminal. Shell command Install ‘code’ command in path.


### Running a new project for the first time
* Go to terminal in VS Code
* cd into .NET folder - (e.g. cd API in this case)
* Run command: dotnet run
  * Should run the app and emit some hosting addresses. One for https, another for http
  * To shut down the app, hit Control + C
  * To set up https certificate: dotnet dev-certs https --trust
    * Requires elevated permissions
  * You can test using the weather forecast controller endpoint
    * https://localhost:5001/weatherforecast
* Setup Logging information
  * appsettings.Development.json

```json
"Logging": {
   "LogLevel": {
     "Default": "Information",
     "Microsoft": "Information",
     "Microsoft.Hosting.Lifetime": "Information"
   }
 }
 ```
```
“Microsoft”: “Information”
Will start seeing more information at the terminal:
info: Microsoft.AspNetCore.Hosting.Diagnostics[1]
      Request starting HTTP/1.1 GET https://localhost:5001/weatherforecast  
info: Microsoft.AspNetCore.Routing.EndpointMiddleware[0]
      Executing endpoint 'API.Controllers.WeatherForecastController.Get (API)'
info: Microsoft.AspNetCore.Mvc.Infrastructure.ControllerActionInvoker[3]
      Route matched with {action = "Get", controller = "WeatherForecast"}. Executing controller action with signature System.Collections.Generic.IEnumerable`1[API.WeatherForecast] Get() on controller API.Controllers.WeatherForecastController (API).
info: Microsoft.AspNetCore.Mvc.Infrastructure.ObjectResultExecutor[1]
      Executing ObjectResult, writing value of type 'API.WeatherForecast[]'.
info: Microsoft.AspNetCore.Mvc.Infrastructure.ControllerActionInvoker[2]
      Executed action API.Controllers.WeatherForecastController.Get (API) in 140.7034ms
info: Microsoft.AspNetCore.Routing.EndpointMiddleware[1]
      Executed endpoint 'API.Controllers.WeatherForecastController.Get (API)'
info: Microsoft.AspNetCore.Hosting.Diagnostics[2]
      Request finished in 542.0269ms 200 application/json; charset=utf-8
info: Microsoft.AspNetCore.Hosting.Diagnostics[1]
      Request starting HTTP/1.1 GET https://localhost:5001/weatherforecast  
info: Microsoft.AspNetCore.Routing.EndpointMiddleware[0]
      Executing endpoint 'API.Controllers.WeatherForecastController.Get (API)'
info: Microsoft.AspNetCore.Mvc.Infrastructure.ControllerActionInvoker[3]
      Route matched with {action = "Get", controller = "WeatherForecast"}. Executing controller action with signature System.Collections.Generic.IEnumerable`1[API.WeatherForecast] Get() on controller API.Controllers.WeatherForecastController (API).
info: Microsoft.AspNetCore.Mvc.Infrastructure.ObjectResultExecutor[1]
      Executing ObjectResult, writing value of type 'API.WeatherForecast[]'.
info: Microsoft.AspNetCore.Mvc.Infrastructure.ControllerActionInvoker[2]
      Executed action API.Controllers.WeatherForecastController.Get (API) in 4.034ms
info: Microsoft.AspNetCore.Routing.EndpointMiddleware[1]
      Executed endpoint 'API.Controllers.WeatherForecastController.Get (API)'
info: Microsoft.AspNetCore.Hosting.Diagnostics[2]
      Request finished in 6.1338ms 200 application/json; charset=utf-8
```

* Where dotnet run looks when it gets evoked:
  * launchSettings.json, “API” block
  * “launchBrowser” can be set to false
  * This is also where “Development” running mode is set
* `dotnet watch run` will install a file watcher that will respond to changes in files during development, and will keep you from having to keep rerunning the app as changes are made.

## Lesson 9
An example Entity class to contain basic user information

```csharp
namespace API.Entities
{
   public class AppUser
   {
       // EF note: Use Id for the PK, don't name it differently
       public int Id { get; set; }
 
       // EF note: Use this as written, with case!
       public string UserName { get; set; }
   }
}
```

## Lesson 10 (no notes)

## Lesson 11
* New Extension: Nuget Gallery Manager by pclio
* Shift + Command + P - to run nuget gallery
* Install Microsoft.EntityFrameworkCore.Sqlite. Make sure the version of EF exactly matches the version of .NET Core the app is build with
## Lesson 12
* Command + . (dot) can be used to apply a fix suggestion
* The light bulb can also be used
* If quick fixes are not being shown, it is probably a configuration problem.
* The quick fix suggestions appear to be coming from the OmniSharp extension

```csharp
using API.Entities;
using Microsoft.EntityFrameworkCore;
 
namespace API.Data
{
 
   // Use Command + . on the DataContext to get a
   // list of actions that can be done - this is how I created
   // the constructor.
   //
   // There was some sort of [NullParameter] attribute
   // that appeared before DbContextOptions that Neil
   // removed without comment. Not sure why, but I do
   // know that the file wasn't going to build without
   // some other namespace being added. :)
   public class DataContext : DbContext
   {
       public DataContext(DbContextOptions options) : base(options)
       {
       }
 
       public DbSet<AppUser> Users { get; set; }
   }
}
```

* Command + P to go to file - type Startup to go to Startup.cs file
  * This can help navigate around the files as long as you know the names of what you’re looking for :) 

```csharp
  public void ConfigureServices(IServiceCollection services)
       {
           // lesson 12
           services.AddDbContext<DataContext>(options =>
           {
               options.UseSqlite("connection string");
           });
```

## Lesson 13
Add connection string information to appsettings.Development.json
Doesn’t matter, as SQLite connection strings don’t have usernames or passwords
SQLite is not a production level db anyway, just good for development purposes, so it’s fine for the settings to be in the json file
{
 "ConnectionStrings" : {
   "DefaultConnection": "Data source=datingapp.db"
 },

Doesn’t like MS way of injection in Startup.cs
Configuration for VS Code:
Command + , (comma) to get into settings
Type private, look for private member prefix
Find the setting, and make sure there is an _ in the settings
Type prefixed this, look for Whether or not a ctor assignment should be prefixed with this
Uncheck the setting

Test out the operation:




## Lesson 48 : Creating a Nav Bar
`ng g -h` - get help from the ng generate command

He likes to create components in the `client/src/app` folder.

`ng g c nav` (create the nav component)
`ng g c nav --skip-tests` (create nav component without tests)

* app.module.ts will have a new import and the `NavComponent` in the `@NgModule / declarations` section.
* work on `nav.component.html` to change the html to show a top nav bar.
  * getbootstrap.com, and click on examples, to find some bootstrap code to copy / paste.

```typescript
// from nav.component.ts - <app-nav></app-nav> to embed
@Component({
  selector: 'app-nav', // this tells you what to embed in another page to show this component
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
```

* A shortcut. Type div.container, then TAB (which is an Emmet abbreviation). This creates the following HTML: 
```html 
<div class="container"></div>
```
  * You can chain classes together, like div.container.otherclass
* Option + Shift + F is used to autoformat code in Visual Studio Code
* Copy a whole line down: Shift + Option + down arrow key


## Lesson 49: Introduction to Angular Template Forms

* imported FormsModule into app.module.ts
* Worked on the form in nav.component (ts and html) to support ngSubmit functionality
and made the form into an angular form.

## Lesson 50: Angular Services

* creates a _services inside ./client/app folder
  * underscore makes the folder pop to the top of the folders listed underneath the app folder. All services will go into this folder.
  * using the terminal, cd into ./client/src/app/_services
  * then issue the command: ```ng g s account```
    * Basically, this is ng generate service called "account"
    * within our new _services folder, we should now see a new file, account.service.ts

## Lesson 51: Injecting Services Into Components
* All changes in nav.component.ts
  * Injected AccountService into the component, and then make the login call through the service.

## Lesson 52: Using Conditionals to Show and Remove Content
* Using the *ngIf structural directive makes it possible to add and remove content from the DOM
* Brief comparison to [hidden], which will merely hide the content. The choice is made for *ngIf because once logged in, we don't need the login form any more.
* Uses a simplified loggedIn switch, which will be improved later.
* Adds a dropdown menu, but isn't really used in this lesson.
* Adds a temporary (additional) Logout link, needed since we're midstream development stage.

## Lesson 53: Using the Angular Bootstrap Components - Dropdown
* To search for ngx bootstrap components that work with bootstrap safely in an Angular application, search the web for ```ngx bootstrap```. Most likely you'll find https://valor-software.com.
* In the case of this lesson, we're focusing on dropdowns, so we select the ```Dropdowns``` item on the nav.  
  * A number of alternate ways of using this component are explained. We're using the basic approach for this lesson.
* If you want to know what CSS class to affect for a specific element, right click on the element in the browser, and select ```Inspect Element```. The DOM explorer should open, and the row will be highlighted. 
  * In the case of our dropdown elements, we find dropdown-toggle and dropdown-item.
* To make the cursor pointer show up over menu button and item elements:
  * In nav.component.css: 
  ```css
.dropdown-item, .dropdown-toggle {
  cursor: pointer;
}

## Lesson 54: Observables
* Promise
  * Provides a single future value
  * Not lazy
  * Can not cancel
* Observable
  * Emits multiple values over time
  * Lazy
  * Able to cancel
  * Can use with map, filter, reduce, and other operators

* Getting data from an Observable
  * you have to .subscribe(), or nothing will come back
  * you can also hook into the error returned
  * and you can react to the response when it is completed.

* .toPromise()
  * it is also possible to convert an observable to a promise 
    * ```this.http.get('api/users').toPromise()```
  * We won't be using this approach in the class - the other method is better.

* The async pipe!
  * ```<li *ngFor='let member of service.getMembers() | async'>{{member.userName}}</li>```
  * Automatically subscribes / unsubscribed from the Observable

## Lesson 55: Persisting the login
* I don't fully understand this!
* going to watch it again I think, and diagram the parts.
* The account service
  * The account service now persists the user login and removes the login in the logout() function
  * It uses something called a ReplaySubject, which "replays" a sequence. It is a form of an Observable.
  * The technique is to set up the ReplaySubject with 1 item, since all we need is the most recent login information.
* The app component
  * The app component now gets the current user from the browser's localStorage.
  * getUsers() remains, as it appears that this is what kicks off the whole communcation with the server (?)
    * The .subscribe() method here was mentioned as the kickoff point (?)
    
## Lesson 57: Adding a home page
*  cd to app directory
* app % ng g c home (ng generate component called home in the app directory)
* did work to put together a basic home page
* Has a Register button that will invoke a login form (next lesson)
* Logic for switching in place

## Lesson 58: Adding a Register form
* cd to app directory
* app % ng g c register (ng generate component called register in the app directory)
* basic set up of new form only, no communication with API

## Lesson 59: Parent to child communication
* app component is parent to home component; home component is parent to register component
  * (app->home->register)
* As part of the setup for this lesson, we add a few more users
  * You have to do this via an API call. We used our Postman collection to do it.
    * {{url}}/api/account/register
    * I added ```scott2``` and ```scott3```, with pwd: ```password```
* Use the square brackets to pass from parent to child. ```[ ]```
  * These get used in the .html file.
  * e.g. 
  ```html
    <app-register [usersFromHomeComponent]="users"></app-register>
  ```
* Then, in the child html, we can use those users thus:
  * ```html
      <div class="form-group">
       <label>Who is your favorite user?</label>
       <select class="form-control">
           <option *ngFor="let user of usersFromHomeComponent" [value]="user.userName">
               {{user.userName}}
           </option>
       </select>
    </div>
  ```
