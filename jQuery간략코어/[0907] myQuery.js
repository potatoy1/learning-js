(function(){
    var $ = function(p_sel){
        return new myDom(p_sel);
    }
    var myDom = function(p_sel) {
        var v_elems = document.querySelectorAll(p_sel);
        this.prev = p_sel; // 실제 jQuery는 이렇게 하지 않음
        // 최초 넘어온 선택자 값을 저장만 해둠
        // jQuery방식과 지금방식은 사용 상황에 따라 득과실이 다름
        this.length = v_elems.length;
        for(var i=0;i<v_elems.length;i++){
            this[i] = v_elems[i];
        }
        return this;   
    }
    window.$=$; 
    $.fn= myDom.prototype;  
})();
//메소드들
$.fn.eq = function(p_index){  
    // return this[p_index]; // 이렇게 하면 메소드 체이닝
    // 선택된 객체 1개만 남기고 this(여기선 myDom)을 리턴해야함
    this[0] = this[p_index];    // 선택된 객체를 맨앞으로 옮기고
    for(var i=1; i<this.length; i++){
        delete this[i];
    }
    this.length = 1;
    return this;    // 선택된 객체 1개만 가진 myDom타입 객체 리턴
}
// innerHTML속성을 컨트롤 하는 메소드, 필수 메소드
$.fn.html = function(p_arg){
    if(!p_arg){                             //읽기
        return this[0].innerHTML;
    }
    if(typeof(p_arg) == "string"){          //쓰기
        for(var i=0;i<this.length;i++){
            this[i].innerHTML = p_arg;
        }
    }
    if(typeof(p_arg) == "function"){        //쓰기
        for(var i=0;i<this.length;i++){
           this[i].innerHTML= p_arg.call(this[i],i,this[i].innerHTML);
        }
    }
}
// 필수 메소드 태그의 속성을 제어하는 메소드, set/getAttribute, .속성명
$.fn.attr = function(p_arg1,p_arg2){
    alert(typeof(p_arg1));
    if(typeof(p_arg1) == "string" && !p_arg2){   //읽기
        return this[0][p_arg1]; // 첫번째 요소의 해당속성값만 리턴
    }
    if(typeof(p_arg1) == "string" && typeof(p_arg2)=="string"){   //쓰기
        for(var i=0; i<this.length;i++){
            this[i][p_arg1] = p_arg2;
        }
    }
    if(typeof(p_arg1) == "object" && !p_arg2){   //쓰기
        for(var i=0; i<this.length;i++){
            for(var v_attr in p_arg1){  // 객체 속성 loop -> for -in 문
                this[i][v_attr] = p_arg1[v_attr];
            }
        }
        return this;
    }
    if(typeof(p_arg1) == "string" && typeof(p_arg2)=="function"){ //`   //플렉서블한 쓰기
        for(var i=0; i<this.length;i++){
            this[i][p_arg1] = p_arg2.call(this[i],i,this[i][p_arg1]);
        }
        return this;
    }
}
// 조금전 본 jQuery val()메소드처럼 동작하도록 만들어 봅니다.
// html()메소드 참고
// val은 value속성을 컨트롤하기위해 만들어짐
// val() 메소드는 속성 value
$.fn.val = function(p_param){
    if(!p_param){                             //읽기
        return this[0].value;
    }
    if(typeof(p_param) == "string"){          //쓰기
        for(var i=0;i<this.length;i++){
            this[i].value = p_param;
        }
        return this; //메소드 체이닝
    }
    if(typeof(p_param) == "function"){        //쓰기
        for(var i=0;i<this.length;i++){
           this[i].value= p_param.call(this[i],i,this[i].value);
        }
        return this;
    }
}
$.fn.click = function(p_cb){
    for(var i=0; i<this.length; i++){
        this[i].onclick = p_cb;
    }
    return this;    //메소드 체이닝
}
$.fn.on = function(p_eName,p_cb){
    for(var i=0;i<this.length;i++){
        this[i].addEventListener(p_eName,p_cb);
    }
    return this; //메소드 체이닝
}

//style객체를 다루는 메소드
$.fn.css = function(p_arg1, p_arg2){
    if(typeof(p_arg1)== "string" && !p_arg2){
        return this[0].style[p_arg1];
    }

    if(typeof(p_arg1)== "string" && typeof(p_arg2) == "string"){    // 쓰기
        for(var i=0;i<this.length;i++){
            this[i].style[p_arg1] = p_arg2;
        }
        return this; //메소드 체이닝
    }
    if(typeof(p_arg1)== "string" && typeof(p_arg2) == "function"){    // 쓰기
        for(var i=0;i<this.length;i++){
            this[i].style[p_arg1] = p_arg2.call(this[i],i,this[i].style[p_arg1]);
        }
        return this; //메소드 체이닝
    }
}
$.fn.end = function(){
    // 산출물로 지친 402호에서 어떤 아이디어가 나오는지 봅시다
    // 힌트: 최초의 선택자를 보관한다면?
    return $(this.prev); // 이미 저장해둔 선택자 값으로 다시 생성
}

// jQuery 메소드의 사용법에 일관된 패턴이 있음을 느꼈으면 좋겠어요
// 읽기, 전부쓰기, 골라서 쓰기
