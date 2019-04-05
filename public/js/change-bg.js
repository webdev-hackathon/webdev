

$(document).ready(() =>{
    var pic = new Image();
    var pic2 = new Image();
    var pic3 = new Image();
    var pic4 = new Image();
    pic.src="../img/backgrounds-wraper/bg-02-hoa-sen.jpg";
    pic2.src="../img/backgrounds-wraper/bia1_QBQI.jpg";
    pic3.src="../img/backgrounds-wraper/hoang-thanh-thang-long-04.jpg";
    pic4.src= "../img/backgrounds-wraper/bg-01-khue-van-cac-3.jpg";
    const picArr = [pic, pic2, pic3, pic4];

    console.log(pic);
    $('#btn-open-menu').click(openNav);
    const linearCode = "linear-gradient(to bottom right,rgba(0,47,75,0.7),rgba(220,66,37,0.7))"
    const sizeAndPosition = [
        "center no-repeat",
        "center no-repeat",
        "bottom center no-repeat",
        "center no-repeat",
    ]
    var i = 0;
    setInterval(()=> {
        if(i===4)
            i = 0;
        changeBg(i, picArr, linearCode, sizeAndPosition);
        i++;
    }, 8000);
});



function changeBg(num ,picArr, linearCode, sizeAndPosition){
    $('#wraper-animation').css("background", `url(${picArr[num].src}) ${sizeAndPosition[num]}`);
    $('#wraper-animation').css("background-size", `cover`);

}