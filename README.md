xAPI Recipes: Blackboard data
=============================

These scripts are refactored versions of scripts used in the context of an ETL solution, implemented with [Kettle (Pentaho Data Integration)](http://community.pentaho.com/projects/data-integration/), for translating Blackboard activity data to Experience API statements and storing them in a Learning Record Store.

## Code structure

Kettle works using *transforms* (XML files describing data movement and change between systems) which operate on *rows* (indivisible units of data functionally isomorphic to database records). As such, a JavaScript *step* in such a transform can execute JavaScript in one of two ways:

 - as a *start/end script* which is executed once for each run of the whole transform;
 - as a *transform script* which is executed once for each row.

The scripts here use start scripts to perform initialization and transform scripts to fill in values based on row data; end scripts are not used.

## Capitalized variable names

These represent fields in the row currently being operated on; in this case, these are fields in the results returned by the previous step, which retrieves data from Blackboard using a database query.

## Differentiation

The division of scripts by activity type seems essentially arbitrary, and with a different surrounding architecture could certainly be consolidated/refactored to something more unitary. However, this structure was necessary because Kettle does not allow a step to have input rows with differing fields, and the queries which return activity data (and therefore also their results) differ significantly depending on the type of activity being retrieved.