
// include the request library
var request = require('request');

// include the underscore library
var _ = require('underscore');

var InfoGroup = function(_username, _password) {

  this._username = _username;
  this._password = _password;

}

InfoGroup.prototype._debug = false;
InfoGroup.prototype._test_mode = false;
InfoGroup.prototype._username = null;
InfoGroup.prototype._password = null;
InfoGroup.prototype._access_token = null;
InfoGroup.prototype._refresh_token = null;
InfoGroup.prototype._qa_token_url = "https://auth.qa.data-axle.infogroup.com/oauth/token?scope=";
InfoGroup.prototype._token_url = "https://auth.data-axle.infogroup.com/oauth/token?scope=";

InfoGroup.prototype.getToken = function(callback) {

  var _instance = this;

  var params = {
    url: this._token_url+"http://"+(this._test_mode === true?"sandbox.":"")+"bulkupdate.infogroup.com/",
    authenticate: true
  }

  this.doRequest(params, function(err, data) {

    if (!_.isNull(err)) {

      return callback(err);

    }

    _instance._access_token = data.access_token;
    _instance._refresh_token = data.refresh_token;

    return callback(null, data);

  })

}

// post some data
InfoGroup.prototype.postData = function(_form_data, callback) {

  if (!_.isObject(_form_data)) {

    return callback("Parameters are not correctly formatted");

  }

  var _params = {
    method: "POST",
    url: "http://"+(this._test_mode === true?"sandbox.":"")+"bulkupdate.infogroup.com/api/1/submissions",
    body: _form_data
  }

  this.doRequest(_params, function(err, data) {

    return callback(err, data);

  })

}

// get a submission
InfoGroup.prototype.getSubmission = function(_form_data, callback) {

  if (!_.isObject(_form_data)) {

    return callback("Parameters are not correctly formatted");

  }

  var _params = {
    method: "GET",
    url: "http://"+(this._test_mode === true?"sandbox.":"")+"bulkupdate.infogroup.com/api/1/submissions",
    body: _form_data
  }

  this.doRequest(_params, function(err, data) {

    return callback(err, data);

  })

}

// make the http request
InfoGroup.prototype.doRequest = function(_params, callback) {

  // do we have a url to go to?
  if (_.isUndefined(_params.url)) {

    return callback("URL is a required parameter", null);

  }

  // set a return type
  _params.json = true;

  // are we requesting the token?
  if (_params.authenticate === true) {

    // remove the custom param
    delete(_params.authenticate);

    // add in the auth
    _params.auth = {
      user: this._username,
      pass: this._password,
      sendImmediately: true
    }

  }

  else if (!_.isNull(this._access_token)) {

    _params.headers = {
      "X-AUTH-TOKEN": this._access_token
    }

  }
  
  // debug mode
  var _debug_mode = this._debug;

  // do the request
  request(_params, function(e, r, b) {

    // output some debug
    if (_debug_mode === true) {

      console.log("****************************************************");
      console.log("** Parameters **");
      console.log(JSON.stringify(_params, undefined, 2));
      console.log("****************************************************");
      console.log("** Result **");
      console.log("Error: "+e);
      console.log("Status: "+r.statusCode);
      console.log("Body: "+JSON.stringify(b, undefined, 2));
      console.log("****************************************************");

    }

    // Error
    if (e) {

      return callback(e, null);

    }

    // Not a status 200
    if (r.statusCode !== 200) {

      return callback("API call responded with a status "+r.statusCode, b);

    }

    // Wooooooooo Bacon
    else {

      return callback(null, b);

    }

  })

}

// turn on/off debug
InfoGroup.prototype.setDebugMode = function(bool) {

  return this._debug = Boolean(bool);

}

// turn on/off test mode
InfoGroup.prototype.setTestMode = function(bool) {

  if (Boolean(bool) === true) {

    this._token_url = this._qa_token_url;

  }

  return this._test_mode = Boolean(bool);
  
}

module.exports = InfoGroup;