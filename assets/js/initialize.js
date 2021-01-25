var firebaseEmailAuth; //파이어베이스 email 인증 모듈 전역변수
var firebaseDatabase; //파이어베이스 db 모듈 전역변수
var userInfo; //가입한 유저의 정보. object 타입
//파이어 베이스 초기화 코드
var firebaseConfig = {
  // firebase_initial_code
};

var user = firebase.auth().currentUser;

//유저가 로그인 했는지 안 했는지 확인해주는 함수
function userSessionCheck() {
  firebaseEmailAuth.onAuthStateChanged(function (user) {

    if (user) {
      //조회 - 데이터 베이스에 저장된 닉네임을 현재 접속되어 있는 user의 pk key 값을 이용해서 가져오기
      firebaseDatabase.ref("users/" + user.uid).once('value').then(function (snapshot) {

        //자바스크립트 dom 선택자를 통해서 네비게이션 메뉴의 엘리먼트 변경해주기
        document.getElementById("loginmenu").textContent = "Logout";
        document.getElementById("loginmenu").href = "#";
        document.getElementById("homemenu").textContent = snapshot.val().username + " 님";
        document.getElementById("homemenu").href = "#";

        username = snapshot.val().username;   //유저 닉네임은 계속 쓸거기 때문에 전역변수로 할당
        loginUserKey = snapshot.key;  //로그인한 유저의 key도 계속 쓸 것이기 때문에 전역변수로 할당
        userInfo = snapshot.val(); //snapshot.val()에 user 테이블에 있는 해당 개체 정보가 넘어온다. userInfo에 대입!

        return true;
      });

    } else {
      return false;

    }
  });
}