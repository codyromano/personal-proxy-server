# Personal Proxy Server

Host multiple Node projects on the same web server without exposing the port numbers for each application

## Set up

```
git clone https://github.com/codyromano/personal-proxy-server.git
cd personal-proxy-server && npm install
```

## Configuration

1. Edit the list of applications in `config/applications.json`.
2. Define your default app in `config/defaultApplication.json`.
3. Update the paths in `config/paths.json`.

For example, I run an app on my personal website called FitBank. The dedicated path prefix for FitBank is `fit-bank`. If a request doesn't begin with that path, the proxy server forwards it to the default application (a blog).

## Running the server

Spin up the web servers that you defined in `applications.json` and `defaultApplication.json`.

Running in Prod:
```
npm start
open http://localhost:80/
```

Running in dev:
```
node index.js
open http://localhost:8081/
```
Running persistently in Prod:
```
# Some aspects of this script such as file paths are specific to my
# implementation, but it's a useful example.
bash ~/codyromano/automation/start-website.bash &
```
