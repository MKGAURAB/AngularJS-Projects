/**
 * Created by khairullah.gaurab on 11/7/2016.
 */

$(function () {
    var socket = io.connect();
    console.log('Submitted');

    var $messageForm = $('#messageForm');
    var $message = $('#message');
    var $chat = $('#chat');
    var $messageArea = $('#messageArea');
    var $userForm = $('#userForm');
    var $userFromArea = $('#userFormArea');
    var $users = $('#users');
    var $username = $('#username');
    $messageForm.submit(function (e) {
        e.preventDefault();
        console.log('Submitted');
        socket.emit('send message',$message.val());
        $message.val('');
    });
    socket.on('new message', function (data) {
        $chat.append('<div class="well"><strong>'+data.user+'</strong>: '+data.msg+'</div>');
    });
    $userForm.submit(function (e) {
        e.preventDefault();
        console.log('Submitted');
        socket.emit('new user',$username.val(),function (data) {
            if(data){
                $userFromArea.hide();
                $messageArea.show();
            }
        });
        $username.val('');
    });
    socket.on('get users', function (data) {
        var html = '';
        for(i=0; i<data.length; ++i){
            html += '<li class="list-group-item">'+data[i]+'</li>';
        }
        $users.html(html);
    })
})
