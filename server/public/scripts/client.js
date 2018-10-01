const app = angular.module('MessagingApp',[]);

app.controller('MessagingController',['$http',function($http){
    let vm = this;
    vm.message = 'Angularjs is working';
    vm.messages=[];
    vm.names=[];

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
        let names=[];
        let nameColor = [];
        $http.get('/messageBoard').then(function(response){
            vm.messages = response.data;

            //The code below is my attempt to give each person a random
            //background color that will show up for all of their messages

            
            //get list of all different names
            for(message of vm.messages){
                if(!names.includes(message.name)){
                    names.push(message.name);
                    nameColor.push({name: message.name});
                }
            }
            //assign each name a color
            for(i=0;i<nameColor.length;i++){
                nameColor[i].color = 'rgb('+(10*i)%255+','+(25*i)%255+','+(50*i)%255+')';
            }
            //pass that color into the vm.messages array
            for(message of vm.messages){
                message.color = 'red';
                for(object of nameColor){
                    console.log('In second for loop');
                    if(message.name == object.name){
                        console.log(message.name,'is the same as',object.name);
                        message.color = object.color;
                    }
                }
            }
            console.log('The different names are:', names);
            console.log('vm.messages is',vm.messages);
        })
    }
    vm.getMessages();
}])