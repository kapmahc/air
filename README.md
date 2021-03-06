# air

A complete open source e-commerce solution by Go language and Vue(STILL IN DEVELOPMENT).

## Install nodejs
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | zsh
nvm install node
nvm alias default node
```

## Install go
```bash
zsh < <(curl -s -S -L https://raw.githubusercontent.com/moovweb/gvm/master/binscripts/gvm-installer)
gvm install go1.9beta1 -B
gvm use go1.9beta1 --default
```

## Devleopment

```bash
cd $GOPATH/src/github.com/kapmahc/air
./run.sh # start backend server
cd dashboard && npm start # start frontend server
```

will listen at <http://localhost:8080>

## Deployment
```bash
cd $GOPATH/src/github.com/kapmahc/air
vim desktop/.env.production.local
make
ls
```

## Create database

```bash
psql -U postgres
CREATE DATABASE db-name WITH ENCODING = 'UTF8';
CREATE USER user-name WITH PASSWORD 'change-me';
GRANT ALL PRIVILEGES ON DATABASE db-name TO user-name;
```

## Issues
- Chrome browser: F12 => Console settings => Log XMLHTTPRequests

- Rabbitmq Management Plugin(<http://localhost:15612>)

  ```bash
  rabbitmq-plugins enable rabbitmq_management
  rabbitmqctl add_user test test
  rabbitmqctl set_user_tags test administrator
  rabbitmqctl set_permissions -p / test ".*" ".*" ".*"
  ```

- "RPC failed; HTTP 301 curl 22 The requested URL returned error: 301"

  ```bash
  git config --global http.https://gopkg.in.followRedirects true
  ```

- 'Peer authentication failed for user', open file "/etc/postgresql/9.5/main/pg_hba.conf" change line:

  ```
  local   all             all                                     peer  
  TO:
  local   all             all                                     md5
  ```

- Generate openssl certs

  ```bash
  openssl genrsa -out www.change-me.com.key 2048
  openssl req -new -x509 -key www.change-me.com.key -out www.change-me.com.crt -days 3650 # Common Name:*.change-me.com
  ```

- Generate sitemap.xml.gz everyday

  ```bash
  @daily cd /var/www/www.change-me.com && ./air seo
  ```

- [For gmail smtp](http://stackoverflow.com/questions/20337040/gmail-smtp-debug-error-please-log-in-via-your-web-browser)

## Atom plugins

- go-plus
- git-plus
- file-icons
- linter
- editorconfig
- language-javascript-jsx

## Documents

- [gorm](http://jinzhu.me/gorm/)
- [nginx](https://www.nginx.com/resources/deployment-guides/load-balance-apache-tomcat/)
- [antd](https://ant.design/docs/react/introduce)
