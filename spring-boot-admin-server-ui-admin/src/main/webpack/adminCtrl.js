/*
 * Copyright 2014 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

module.exports = function ($scope, $http) {
  'ngInject';
  $scope.applications = 'default';
  $scope.instances = 'default';
  $scope.users = 'default';

  /**
   * Bind the form data with this controller.
  */
  var self = this;
  self.user={id:'',userName:'',password:'',email:'',enabled:1};

  $http.get('applications').then(function (response) {
    $scope.applications = response.data;
  });

  $http.get('instances').then(function (response) {
    $scope.instances= response.data;
  });

  $http.get('users').then(function (response) {
    $scope.users= response.data;
  });

  /**
   * Add user controller method.
  */
  $scope.addUser = function() {
    var res = $http.post('/users', JSON.stringify(this.user), {headers: [{'Content-Type': 'application/json'},
    {'Accept': 'application/json'}]});
    res.success(function(data, status, headers, config) {
      alert('Add new user successfully!');
    });
    res.error(function(data, status, headers, config) {
      alert( 'failure message: ' + JSON.stringify({data: data}));
    });
  };
};

