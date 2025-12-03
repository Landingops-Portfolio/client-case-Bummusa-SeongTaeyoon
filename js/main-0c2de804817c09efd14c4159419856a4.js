function addShow(target) {
    target.addClass("fade-show");
}

function numFormat(variable) {
    variable = Number(variable).toString();
    if(Number(variable) < 10 && variable.length == 1) variable = "0" + variable;

    return variable;
}



$(document).ready(function() {
    $(".wrapper").fullpage({

        scrollingSpeed: 900,
        css3: false,
        navigation: false,
        navigationPosition: 'right',
        controlArrows: false,
        verticalCentered: false,
        scrollOverflow: true,
        touchSensitivity:20,
        scrollOverflowOptions: {
            preventDefault: false
        },
        afterRender: function () {
            // 해시 제거 + 1번 섹션으로 이동
            if (location.hash) {
                history.replaceState(null, null, ' ');
            }
            $.fn.fullpage.moveTo(1);
        },
        onLeave: function(index, nextIndex, direction) {

            if (nextIndex >= 2 && $(".right-quick-menu").css("display") == "none") {
                $(".right-quick-menu").show();
            } else if (nextIndex == 1 && $(".right-quick-menu").css("display") != "none") {
                $(".right-quick-menu").show();
            }

        },
        afterLoad: function(index, nextIndex, direction){
            var leavingSection = $(document.getElementsByClassName("section"+ numFormat(nextIndex)));
            addShow(leavingSection.find(".fade"));
            //페이지네이션
            if ( nextIndex == 5 || nextIndex == 6 ) {
                $("#fp-nav ul li a.active span").addClass("black");
                $(".fp-slidesNav ul li a.active span").addClass("black");
                $("#fp-nav ul li a span").addClass("black");
                $(".fp-slidesNav ul li a span").addClass("black");
            } else if (nextIndex == 1 ||  nextIndex == 2 ||  nextIndex == 3 ||  nextIndex == 4) {
                $("#fp-nav ul li a.active span").removeClass("black");
                $(".fp-slidesNav ul li a.active span").removeClass("black");
                $("#fp-nav ul li a span").removeClass("black");
                $(".fp-slidesNav ul li a span").removeClass("black");
            }
            //스크롤버튼
            if (nextIndex >= 6 ) {
                $('.icon-scroll').removeClass("on");
                $('.icon-scroll').addClass("off");
            }
            else {
                $('.icon-scroll').removeClass("off");
                $('.icon-scroll').addClass("on");
            }
        }
    });

    $(".on-top").on("click", function() {
        $.fn.fullpage.moveTo(1);
    });
    // 스크롤다운 화살표 클릭 시 다음 섹션으로 이동
    $(".icon-scroll").on("click", function() {
        $.fn.fullpage.moveSectionDown();
    });

    $(".fade").each(function(i, v) {
        $(window).scroll(function() {
            var position = $(window).width() < 700 ?  $(window).height() : $(window).height()/100 * 80;
            if ($(v).attr("class").indexOf("fade-show") < 0) {
                if ($(window).scrollTop() > $(v).offset().top - position) {
                    addShow($(v));
                }
            }
        });
    });



});
