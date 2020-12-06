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


## Lesson 48 : Creating a Nav Bar
ng g -h - get help from the ng generate command

He likes to create components in the client/src/app folder.

ng g c nav (create the nav component)
ng g c nav --skip-tests (create nav component without tests)






