var firebaseEmailAuth; //파이어베이스 email 인증 모듈 전역변수
var firebaseDatabase; //파이어베이스 db 모듈 전역변수
var userInfo; //가입한 유저의 정보. object 타입

// 파이어베이스 초기화 코드
var firebaseConfig = {
    // firebase_initial_code
};
       
       //로그인 성공했을 때
        function loginSuccess(firebaseUser) {
          alert("로그인 성공");
          //메인 페이지로 이동
          window.location.href = "/index.html"
      }

      function initApp() {
          // 인증 상태 변경 내용을 확인
          firebase.auth().onAuthStateChanged(function (user) {

              if (user && isAdduser) {
                  // 사용자 로그인
                  var ref = firebaseDatabase.ref("users/" + user.uid); //저장될 곳을 users라는 부모 키를 레퍼런스로 지정.
                  var username = $('#username').val();

                  //저장 형식
                  var obj = { username: username };
                  ref.set(obj); // 고유한 자식 키가 하나 생셩이 되면서 json 삽입

                  alert("가입성공");

                  window.location.href = "/index.html"

              } else {
                  //사용자 로그아웃
              }
          });
      }

      window.onload = function () {
          initApp();
      };