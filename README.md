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

For example, I run an app on my personal website called FitBank. The dedicated path prefix for FitBank is `fit-bank`. If a request doesn't begin with that path, the proxy server forwards it to the default application, a Ghost blog.

## Running in Prod

```
npm start
open http://localhost:80/
```

## Running in Dev

```
node index.js
open http://localhost:8081/
```
