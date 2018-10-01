const app = angular.module('MessagingApp',[]);

app.controller('MessagingController',['$http',function($http){
    let vm = this;
    vm.message = 'Angularjs is working';
    vm.messages=[];

    vm.postMessage = function(message){
        console.log('Name:',message.name);
        console.log('Message:',message.message);
        $http.post('/messageBoard',message).then(function(response){
            vm.getMessages();
        }).catch(function(error){
            console.log('Error in POST:',error);
        })

        vm.newMessage={};
    } 

    vm.getMessages=function(){
        $http.get('/messageBoard').then(function(response){
            vm.messages = response.data;
        })
    }
    vm.getMessages();
}])