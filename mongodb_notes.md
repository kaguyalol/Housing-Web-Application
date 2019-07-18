## Setup
- run MongoDB as a macOS service
$brew services start mongodb-community@4.0

- Connect and Use MongoDB
$mongo

## Our First Mongo Commands
* show [dbs][collections]
* use [database name]
* db.[collection name].insert()
* db.[collection name].find() 
    * db.[collection name].find({name: ""})
* db.[collection name].update() 
    * db.[collection name].update({name: "Susy", }, {$set: {name: "Pesy"}}) 
* db.[collection name].deleteOne({})
* db.help()


