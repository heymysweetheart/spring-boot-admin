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
  $scope.master= {};

  /**
   * Bind the form data with this controller.
  */
  var self = this;

  self.user={userId:'',userName:'',password:'',email:'',enabled:1};

//  self.targetUser={userId:'',userName:'',password:'',email:'',enabled:1};

  self.application={id:'',applicationName:'', isRegistered:1};

  self.userRegistryInfo={userId:'1', roles:{'1':['ROLE_USER']}};

  $scope.userRegistryInfo=self.userRegistryInfo;

  refreshData();

//  $scope.reset = function() {
//    alert(self.user);
//    self.user={id:'',userName:'',password:'',email:'',enabled:1};
////    self.user.userName = '';
////    $scope.user=angular.copy($scope.master);
//  };


  function refreshData() {
    $http.get('applications').then(function (response) {
      $scope.applications = response.data;
    });

    $http.get('instances').then(function (response) {
      $scope.instances= response.data;
    });

    $http.get('users').then(function (response) {
      $scope.users= response.data;
    });
  }

  /**
   * Add user controller method.
  */
  $scope.addUser = function() {
    var res = $http.post('/users', JSON.stringify(this.user), {headers: [{'Content-Type': 'application/json'},
    {'Accept': 'application/json'}]});
    this.user.userName = '';
    this.user.password= '';
    this.user.email= '';
    res.success(function(data, status, headers, config) {
      refreshData();
      alert('Add new user successfully!');
    });
    res.error(function(data, status, headers, config) {
      alert( 'failure message: ' + JSON.stringify({data: data}));
    });
  };

  /**
   * Add role allocation controller method.
  */
  $scope.addRoles = function() {
    console.log(JSON.stringify($scope.userRegistryInfo));
    var res = $http.post('/roles', JSON.stringify($scope.userRegistryInfo), {headers: [{'Content-Type': 'application/json'},
    {'Accept': 'application/json'}]});
    res.success(function(data, status, headers, config) {
      self.userRegistryInfo={userId:'1', roles:{'1':['ROLE_USER']}};
      alert('Add new roles successfully!');
    });
    res.error(function(data, status, headers, config) {
      alert( 'failure message: ' + JSON.stringify({data: data}));
    });
  }/**
   * Add role allocation controller method.
  */
  $scope.change= function(key, value) {
//      var value;
      var rolesName = [];
      for(var name in $scope.userRegistryInfo.roles){
//          value =$scope.userRegistryInfo.roles[name];
          console.log("Value is " + value);
          delete $scope.userRegistryInfo.roles[name];
      }
      if(value==="['ROLE_ADMIN','ROLE_USER']") {
        rolesName[0] = 'ROLE_USER';
        rolesName[1] = 'ROLE_ADMIN';
      console.log("rolesNames are " + rolesName);
      } else {
        rolesName[0] = 'ROLE_USER';
        console.log("rolesName is " + rolesName);
      }
      $scope.userRegistryInfo.roles[key]=rolesName;
//      console.log("rolesName is " + rolesName[]);
//      $scope.userRegistryInfo.roles[key]=value;
//      console.log($scope.userRegistryInfo.roles);
//      console.log(key);
//      console.log(value);
  };
};

