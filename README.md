InfoGroup
=========

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

  `submissions` - one or more records to add to the database

---

When submitting a record the `Submission Type` parameter has the following options:

---

`A` - Add record  
  `U` - Update record  
  `R` - Renew record  
  `D` - Delete record

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

### Fetching Submission records

Parameters for getting submissions are as follows:

---

  `ids` - one or more submissions to get from the database

---

Returned statuses are as follows:

---

  `complete` - one or more submissions to get from the database
  `processing` - this submission is being processed
  `failed` - there was a problem with this submission

---

InfoGroup also provide a list of processing errors when returning submissions, these are outlined in the following way:

---

  `warnings` - minor errors not causing the submission to fail
  
  ```json
  {
    "processing_messages": {
      "warnings": {"name": "standardized to Wendy's"}
    }
  }
  ```

  `errors` - major errors causing the submission to fail

  ```json
  {
    "processing_messages": {
      "errors": {"state": "is not valid"] }
    }
  }
  ```

---

If any submission cannot be found as reponse like this can be expected:

```json
  {
    "result": "error",
    "error": "could not find submission with id: 34c66bc0-d385-11e2-946f-476095fff0ab"
  }
```

Basic example:

```javascript
infogroup.getToken(function(err) {

  if (err) {

    console.log("Errrrrr");
    console.log(err);
    process.exit();

  }

  var params = {
    ids: [
      "34c415dc-d385-11e2-8400-fda2de9a8a9c",
      "34c66bc0-d385-11e2-946f-476095fff0ab"
    ]
  }

  / do the call for the adding data
  infogroup.getSubmissions(params, function(err, data) {

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
      "status": "completed",
      "submitted_at": "2013-08-30T10:21:09.000-04:00",
      "processing_messages": null,
      "id": "34c415dc-d385-11e2-8400-fda2de9a8a9c",
      "infogroup_id": "689400166",
      "express_update_url": "http://www.expressupdate.com/places/DFJDDKD",
      "submission_type": 'A',
      "update_expiration_date": "2013-08-30T10:21:09.000-04:00"
    },
    {
      "status": "processing",
      "submitted_at": "2013-08-30T10:21:09.000-04:00",
      "processing_messages": {
        "warnings": {"name": "standardized to Wendy's"}
      },
      "id": "34c66bc0-d385-11e2-946f-476095fff0ab",
      "infogroup_id": "347848748",
      "express_update_url": "http://www.expressupdate.com/places/GFGDHGJ",
      "submission_type": 'A',
      "update_expiration_date": "2013-08-30T10:21:09.000-04:00"
    }
  ]
}
```

## Documentation

The documentation for the InfoGroup API can be found by visiting the website below  
  [http://sandbox.bulkupdate.infogroup.com/docs/api](http://sandbox.bulkupdate.infogroup.com/docs/api)

Note: Not all fields are included in the InfoGroup documentation, there is a document in the documentation folder which contains a list of fields that are not included which was supplied by the nice people at InfoGroup.

## Dependencies

[request](http://github.com/mikeal/request.git)  
  [underscore](http://underscorejs.org)
