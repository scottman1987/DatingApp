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
1. The truth is that I found this code related to nvm in the ~/.bash_profile file at the end. 
1. For some reason it seems that the brew installer doesn’t put anything into .zshrc file. Maybe it is because I just converted from bash to zsh
1. Quit the Terminal and restart


## Lesson 48 : Creating a Nav Bar
ng g -h - get help from the ng generate command

He likes to create components in the client/src/app folder.

ng g c nav (create the nav component)
ng g c nav --skip-tests (create nav component without tests)






