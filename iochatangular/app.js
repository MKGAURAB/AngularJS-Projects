/**
 * Created by khairullah.gaurab on 11/7/2016.
 */

(function () {
    var app = angular.module('iochat',['btford.socket-io']);
    app.factory('socket', function (socketFactory) {
        // var socket= io.connect();
        // return socket;
        return socketFactory();
    });

    app.controller('Chatter', function () {
        this.shDiv = true;
    });

    app.controller('SubmitUserCtrl', function (socket) {
        var temp = this;
        temp.username = '';
        temp.submitUser = function(){
            socket.emit('new user',this.username);
        };
        temp.userNames = [];
        socket.on('get users',function (data) {
            temp.userNames = [];
            for(i=0; i<data.length; ++i) temp.userNames.push(data[i]);
        });
    });
    app.controller('SubmitMessages', function (socket) {
        var temp = this;
        temp.message = '';
        temp.submitMessage = function(){
            socket.emit('send message',temp.message);
            temp.message='';
        };
        socket.on('new message', function (data) {
            console.log(data.user+' and '+data.msg);
            var myElm = angular.element(document.querySelector('#chat'));
            myElm.append('<div class="well"><strong>'+data.user+'</strong>: '+data.msg+'</div>');

        });
    });

})();

