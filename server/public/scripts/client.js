const app = angular.module('MessagingApp',[]);

app.controller('MessagingController',['$http',function($http){
    let vm = this;
    vm.message = 'Angularjs is working';
}])