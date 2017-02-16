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

var angular = require('angular');

var module = angular.module('sba-admin', ['sba-core']);
global.sbaModules.push(module.name);

//module.controller('adminCtrl', require('./adminCtrl.js'));
//module.component('userManager', require('./components/userManager.js'));

module.controller('adminCtrl', ['$scope', '$q',function($scope, $q) {
    var self = this;
    self.user={id:null,username:'',password:'',email:''};

    function createUser(user){
        var deferred = $q.defer();
        $http.post('/users', user)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while creating User');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }

    function submit() {
        if(self.user.id===null){
            console.log('Saving New User', self.user);
            createUser(self.user);
        }else{
//            updateUser(self.user, self.user.id);
            console.log('User updated with id ', self.user.id);
        }
        reset();
    }

    function reset(){
        self.user={id:null,username:'',password:'',email:''};
        $scope.userForm.$setPristine(); //reset Form
    }

}]);
module.config(function ($stateProvider) {
  $stateProvider.state('admin', {
    url: '/admin',
    templateUrl: 'admin/admin.html',
    controller: 'adminCtrl'
  });
});

module.run(function (MainViews) {
  MainViews.register({
    title: 'Admin',
    state: 'admin',
    order: 100
  });
});
