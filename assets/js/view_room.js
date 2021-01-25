function add_room_list() {
    alert("확인용");
    var roomRef = firebaseDatabase.ref('room');
    roomRef.on('child_added', on_room_list);

}

function on_room_list(data) {
    console.log("**확인용 / 함수 호출에 성공하여 방 리스트를 가져옴");
    var key = data.key;
    var Data = data.val();
    var userkey = Data.userkey;
    var room_title = Data.room_title;
    var name = Data.username;
    var room_text = Data.room_text;
    var room_address = Data.room_address;
    var room_image = Data.imageURL;

    var html = "<article><header><h2><a href=\"#\">" + room_title + "<br/></h2></header>"
        + "<a href=\"#\" class=\"image fit\"><img src=\"" + room_image + "\" alt=\"\" /></a>"
        + "<ul class=\"actions special\">"
        + "<li><a href=\"#\" class=\"button\">More</a></li>"
        + "</ul></article>";

    $('.posts').append(html); //body 내의 room_list 클래스 안에 html을 붙여넣어준다.
}