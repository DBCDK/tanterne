# tanterne
DK5 Digital

##Releases
Releases are found at GitHub [/releases](https://github.com/DBCDK/tanterne/releases). Each containing a link to the changelog for the given release. A consolidated changelog for all releases is found at [CHANGELOG.md](https://github.com/DBCDK/hejmdal/blob/master/CHANGELOG.md) in the project root.  
The changelog is made with [github_changelog_generator](https://github.com/skywinder/Github-Changelog-Generator) and can be created with the command `github_changelog_generator -u DBCDK -p tanterne --exclude-tags-regex "(jenkins-|\d\.\d\d{1,})"` -- you may need a valid github token to run the command.

##Installation
###Elastic Search
Download Elastic Search, like: https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.1.2.tar.gz 

Install and start it

###Get data
Records are dumped from the DBC libv3 system like:

setenv NLS_LANG AMERICAN_DENMARK.WE8ISO8859P1 ; dump_v3 <user>/<password>@<some.db>.dbc.dk | marcunicode > dk5_total.iso2709

###Convert
* iso2709ToElasticLoad -i dk5_total.iso2709 -o elastic_bulk_load.json

Filter only one dk5 group like (for test purposes)
* iso2709ToElasticLoad -f 13 -i dk5_total.iso2709 -o elastic_bulk_load.json

###Load Elastic Search
* curl -XDELETE localhost:9200/* or delete indexes: register, systematic and ignored
* curl -XPUT localhost:9200/systematic -d '{"mappings":{"systematic":{"properties":{"parent":{"type":"string","index":"no"}}}}}'
* curl -XPOST localhost:9200/_bulk --data-binary '@elastic_bulk_load.json'
* curl -XPUT localhost:9200/*/_settings -d '{"index": {"max_result_window": 50000}}'
 
##Development
After cloning the repository, run `npm install` to install dependencies. Copy test.env to env.env and set the environment variables (see below) to you need/liking. The application is started with `npm run dev`, which include [nodemon](https://www.npmjs.com/package/nodemon) in order to restart the application, when the code is changed.

##Environment variables

The variables are specified at the form `name : internal config object`. References in the log from the startup, will use the internal config object.

- `APP_NAME` : `app.name`  
Default: `no name`

- `ELASTIC_HOST` : `elastic.host`  
host and port, like localhost:9200

- `ELASTIC_LOG` : `elastic.log`  
Set Elastic Search log level (trace, warning, error). default: error, warning

- `LOG_LEVEL` : `log.level`  
Specifies the log level used by the application. Defaults to `INFO`
Log level constants supported:: `OFF` (0), `ERROR` (1), `WARN` (2), `WARNING` (2), `INFO` (3), `DEBUG` (4), `TRACE` (5)

- `NODE_ENV` : `app.env`  
When run in production the `NODE_ENV` should be set to `production`: `NODE_ENV=production`

- `PORT` : `app.port`  
Specifies the port to expose the application. Default: `3010`
 
- `PRETTY_LOG` : `log.pretty`  
Set to `1` (`PRETTY_LOG=1`) for pretty printed log statements. Any other setting, will result in one-line log statements.

#Documentation
##Endpoints

- `/api/hierarchy/?q=india`

- `/api/search/?q=india&limit=1&offset=0`

- `/api/suggest/?q=india`

