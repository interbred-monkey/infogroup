InfoGroup
=========

# About

A simple Node.JS wrapper around the InfoGroup business directory API

## Installation

[infogroup](https://npmjs.org/package/infogroup) is available through an installation from npm.

```javascript
npm install infogroup
```

## Usage

To use this library simply require the file and create a new instance of the module like so:

```javascript
var InfoGroup = require('infogroup');
var infogroup = new InfoGroup(username, password);
```

### Using Debug mode

The debug mode is set to false by default, when switched on the API parameters will be logged out along with the API call that is being called and the response.

```javascript
infogroup.debugMode(true);
```

### Using Test mode

Test mode is set to false by default, when switched on the module will use the InfoGroup sandbox environment to stop test data being added to the live database.

```javascript
infogroup.testMode(true);
```

### Manipulating records

Parameters for adding a record are as follows:

---

`name` - if writing records in batches a name for the batch (require if batch writing)  
  `batch_id` - submits records to the same batch  
  `submissions` - one or more records to add to the database

---

Submission parameters are as follows:

---

`Submission Type` - the type of submission 
  * A - Add record  
  * U - Update a record  
  * R - Renew a record  
  * D - Delete a record  

`Company Name`  
  `Location Address`  
  `Location City`  
  `Location State`  
  `Location Zip Code`  
  `Location Phone`

---

Basic example:

```javascript
infogroup.getToken(function(err) {

  if (err) {

    console.log("Errrrrr");
    console.log(err);
    process.exit();

  }

  var params = {
    submissions: [
      {
        "Submission Type": "A",
        "Company Name": "Axel Foley",
        "Location Address": "1154 Summit Dr",
        "Location City": "Beverly Hills",
        "Location State": "CA",
        "Location Zip Code": "90210",
        "Location Phone": "7039554747"
      },
      {
        "Submission Type": "U",
        "Company Name": "Roadhouse Diner",
        "Location Address": "405 Memorial Drive",
        "Location City": "Plano",
        "Location State": "TX",
        "Location Zip Code": "75074",
        "Location Phone": "206-405-9181"
      }
    ]
  }

  / do the call for the adding data
  infogroup.postData(params, function(err, data) {

    console.log(err, data)

  })

})
```

Example response:
```javascript
{
  "result": "success",
  "submissions": [
    {
      "result": "success",
      "id": "34c415dc-d385-11e2-8400-fda2de9a8a9c"
    },
    {
      "result": "success",
      "id": "34c66bc0-d385-11e2-946f-476095fff0ab"
    }
  ]
}
```

## Third-party libraries

[request](http://github.com/mikeal/request.git)  
  [underscore](http://underscorejs.org)