var express = require('express');
var app = express();//app만들기
var http = require('http').createServer(app);//http서버생성
var io = require('socket.io')(http);//http서버를 socket.io에 연결
app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
});
var room_name = 'task';

//소켓 연결시 이벤트리스너. 클라이언트 url변경 등 소켓연결이 종료되면 disconnect이벤트리스너로 서버측에서 확인가능.
io.on('connection', function(socket){
    console.log('클라이언트 연결됨. 소켓 id는 : ', socket.id);
    var instanceId = socket.id;

    socket.on('join_room', function(){
        socket.join(room_name);
    })

    //받은 데이터를 단순히 같은 room에 있는 브라우저에 전달
    socket.on('reqEvt',function(data){
        io.sockets.in(room_name).emit(data.evtName, data);
    });
});

//http서버의 포트번호
http.listen(3000, function(){
    console.log('연차 노드 서버 연결 시작');
});