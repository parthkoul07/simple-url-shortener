/*
mongodb is a NoSQL database;
for us, that means it stores data in json-like format and stores similar objects together into a 'collection';
a collection is like the counterpart for a table in a SQL database;
and just like a SQL db contains many tables - each having data related to different subjects (like teachers, students, etc);
mongodb has many 'collections' within a database;
A record in MongoDB is a document, which is a data structure composed of field and value pairs. 
MongoDB documents are similar to JSON objects. The values of fields may include other documents, arrays, 
and arrays of documents. 
*/

/*
about the mongo sb shell - mongosh:
- db/collections can be created on the go - i.e. if its not there, and you try to access it, it will be automatically created;
- use acts like cd;
- db. refers to the current database we are in;
- db.createCollection("nameofcollection") creates a new collection;
- we can do these things using the mongo db compass too;
*/

/*
top-down:
connection(each project on a certain connection - like localhost:27017) -> databases -> collections -> actual data in json like format; 
*/

/*
objectId is automatically generated;
there is no schema - no rows columns - just documents living in a collection;
db.collectionname.find().options for queries where options are like limit(x),sort(condition);
use .find({condition}) to find all documents that fullfil the condition;
use .find({condition},{field1 : 1/0, _id : 0}) to only output/exempt a certain field value and not others from the documents that meet condition;
complex queries:
.find({age : {$gte: 19}})  
.find({name : {$in: [arrray of names]}})   similarly there is $nin (returns all docs where name is not from the ones that are in array of names);
.find({age : {$exists: true}})   checks if the key (here, age field) exists in the doc;
.find( {age : { $gte: 20 , $lte: 40} }, {name: "kyle"} )   age lies between 20 and 40 AND name is Kyle;
so basically AND is implied, but how to do OR:
.find( { $or: [ {age : { $gte: 20 , $lte: 40} }, {name: "kyle"} } ] } );
basically, .find({$or: [conditions separated by commas]})
similarly, .find({$and: [consitions separated by commas]})
and we have ... $not: {condition} ...  to run query on the negation of the condition;
...
.find($expr: {$gt: ["$income","$expenditure"]})  
expr -> expression
income field and expenditure field are represented by putting $ before them;
the above returns docs where income is greater than expenditure;
...
.find({"fieldname.propertyname : "value"}) -> nesting just like javascript;
.findOne(condition) -> first such doc satisfying the condition;
.countDocuments(condition);
...
updating data:
.updateOne({_id: ..., {$set: {age : 27} }}) 
we also have $inc to increment, $rename to rename a column; $unset:{field:""} to remove that column from that document;
*/