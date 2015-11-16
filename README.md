xAPI Recipes: Blackboard data
=============================

These scripts are refactored versions of scripts used in the context of an ETL solution, implemented with [Kettle (Pentaho Data Integration)](http://community.pentaho.com/projects/data-integration/), for translating Blackboard activity data to Experience API statements and storing them in a Learning Record Store. As such they may be useful as recipes for storing similar data; what follows are some notes on things that may not be immediately obvious to anyone reading the code without specific knowledge of Kettle.

## Code structure

Kettle works using *transforms* (XML files describing data movement and change between systems) which operate on *rows* (indivisible units of data functionally isomorphic to database records). As such, a JavaScript *step* in such a transform can execute JavaScript in one of two ways:

 - as a *start/end script* which is executed once for each run of the whole transform;
 - as a *transform script* which is executed once for each row.

Importantly, variables/functions declared in a start script are available to the transform scripts also. The scripts here use start scripts to perform initialization and transform scripts to fill in values based on row data; end scripts are not used.

## Capitalized variable names

These represent fields in the row currently being operated on; in this case, these are fields in the results returned by the previous step, which retrieves data from Blackboard using a database query.

## Differentiation

The division of scripts by activity type seems essentially arbitrary, and with a different surrounding architecture could certainly be consolidated/refactored to something more unitary. However, this structure was necessary because Kettle does not allow a step to have input rows with differing fields, and the queries which return activity data (and therefore also their results) differ significantly depending on the type of activity being retrieved.

## IRI schema

Because the LRS is content-agnostic and only requires statements to be correctly-formatted, it was necessary to agree with project stakeholders on a namespace for the large proportion of identifiers which are required by the xAPI spec to be IRIs. These agreements should be self-evident from the code.

## Object cloning

Kettle implements an internal JavaScript engine, and importing external libraries is essentially more trouble than it's worth; as such I chose an inelegant but low-maintenance method of creating a copy of an object: `JSON.parse(JSON.stringify(obj))`

## Serialization

Where an input field could be assigned to the `statement` object exactly as received from the previous step, it was necessary to coerce it explicitly to a string first. This is because Kettle (being written in Java) treats rows and fields as objects rather than raw data; the Field class implements `toString()` but not `toJSON()`, so calling `JSON.stringify()` on an object with unmodified input fields as values throws an error.

## Output 

Output fields in every case were:

 - `data`: serialized statement object
 - `xApiVersion`: the string `'1.0.1'`, passed as output because Kettle's *REST Client* step (which does the actual storing of statements in the LRS) requires that HTTP headers be passed in as input.
