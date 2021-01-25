var room_upload = document.getElementById("room_upload");
room_upload.addEventListener("click", room_upload()); //찾기버튼

function room_upload() {
    var logincheck = document.getElementById("loginmenu").textContent;
    if (logincheck == "Logout") {//메뉴바의 상태가 로그아웃일 경우, 사용자가 로그인을 하고 있는 상태이므로 글을 올릴 수 있도록
        var room_file_btn = document.getElementById("room_file_btn");
        var file = room_file_btn.files[0];//첨부파일 가지고 오기


        if (room_file_btn.value != '') {//첨부파일이 선택되어 있는 경우
            var storageRef = firebase.storage().ref('/room_image/' + file.name);
            var task = storageRef.put(file);

            //각 앨리먼트 내의 값 가져오기
            var room_title = $("#room_title").val();
            var room_text = $("#room_text").val();
            var room_address = $("#room_address").val();
            var room_location;

            var geocoder = new daum.maps.services.Geocoder();

            // 주소로 좌표를 검색합니다
            geocoder.addressSearch(room_address, function (result, status) {

                // 정상적으로 검색이 완료됐으면 
                if (status === daum.maps.services.Status.OK) {

                    room_location = new daum.maps.LatLng(result[0].y, result[0].x);

                }
            });


            task.then(function (snapshot) {
                firebase.storage().ref('/room_image/' + file.name).getDownloadURL().then(function (imageURL) {
                    var roomRef = firebaseDatabase.ref("room").push();
                    var obj = {
                        userkey: loginUserKey,
                        username: username,
                        room_title: room_title,
                        imageURL: imageURL,
                        room_address: room_address,
                        room_location: room_location,
                        room_text: room_text
                    }
                    roomRef.set(obj);
                    alert("글이 저장되었습니다.!");
                    window.location.href = "/index.html"

                }).catch(function (error) {
                    alert(error.message);
                });
            }, function (error) {
                alert("글이 정상적으로 저장되지 않았습니다. : " + error.message);
                return false;
            });
        } else {
            alert("양식을 모두 만족하여야 합니다. 빠짐 없이 작성해주세요!");
        }
    } else {
        alert("로그인이 필요한 서비스 입니다.")
    }

}
