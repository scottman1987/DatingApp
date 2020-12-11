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






