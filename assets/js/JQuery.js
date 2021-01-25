//제이쿼리를 사용한다.
$(document).ready(function () {

    //로그인 버튼 눌렀을 때
    $(document).on('click', '#login_btn', function () {

        //제이쿼리 선택자와 val() 함수를 이용해서 이메일,비밀번호 값을 가져온다.
        var email = $('#email').val();
        var password = $('#password').val();

        //파이어베이스 이메일 로그인 함수(파이어베이스에서 기본으로 제공되는 함수)
        firebaseEmailAuth.signInWithEmailAndPassword(email, password)
            .then(function (firebaseUser) {

                //성공하면 firebaseUser에 유저 정보 값이 담겨 넘어온다.
                loginSuccess(firebaseUser);

            })
            .catch(function (error) {
                // 실패했을 때 에러 처리
                alert(error);
                alert("로그인 실패");
                $('#email').val("");
                $('#password').val("");
            });

    });
});


//회원가입 관련 코드
$(document).ready(function () {

    //가입버튼 눌렀을 때
    $(document).on('click', '#join_btn', function () {

        var join_email = $('#join_email').val();
        var join_password = $('#join_password').val();

        //입력 정보 저장 및 회원가입 완료를 위한 코드
        isAdduser = true;

        firebaseEmailAuth.createUserWithEmailAndPassword(join_email, join_password).catch(function (error) {
            //에러가 발생했을 때
            var errorCode = error.code;
            var errorMessage = error.message;

            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            isAdduser = false;

        });


    });
});


$('#loginmenu').click(function () {
    if (document.getElementById("loginmenu").textContent == "Logout") {
      firebaseEmailAuth.signOut().then(function () {
        //로그아웃 완료시 각 앨리먼트 값, 링크 변경
        //자바스크립트 dom 선택자를 통해서 네비게이션 메뉴의 엘리먼트 변경해주기
        document.getElementById("loginmenu").textContent = "Login";
        document.getElementById("loginmenu").href = "index.html";
        document.getElementById("homemenu").textContent = "로그인하세요!";
        document.getElementById("homemenu").href = "#";
        window.location.href = "index.html"
      }).catch(function (error) {
        if (error) {
          alert("로그인 실패");
        }
      });
    } else {
      window.location.href = "login.html"
    }
  })
