<?php
    // php는 서버사이드 프로그램 언어(동적언어라고도 함/미리 html만들어 놓는것이 아닌 요구가 생기면 만듬) 한때
    // (asp, php, jsp가 3대 웹 서버 프로그램언어였음)
    // 상대적으로 html을 정적언어라고도 부름 
    // .은 php에서 문자열 더하기, echo는 출력문임
    // 서버 프로그램은 실행결과 HTML형식의 파일을 만들어서
    // 클라이언트에게 보내줌
    echo $_GET["aaa"]."<br>";
    echo $_GET["zzz"]."<br>";
    echo "<h1>".$_POST["bbb"]."</h1><br>";
    echo "<h1>".$_POST["yyy"]."</h1><br>";
?>
<h1>서버에서 만들었어요</h1>