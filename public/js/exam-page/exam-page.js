$(document).ready(function () {
    countDown();
    createFlagForm();
});

function createFlagForm() {
    let table = '';
    let num = 13;
    let row = 0;
    if (num / 10 >= Math.floor(num / 10)) {
        row = Math.floor(num / 10) + 1;
    }
    let order = 1;

    for (let i = 0; i < row; i++) {
        let td = '';
        for (let j = 0; j < 10; j++) {
            td += '<td id="flag-'+(order)+'"><a href=#Q' + (order) + '>' + (order) + '</a></td>';
            if ( order >= num)
                break;
            order++;
        }
        table = table + '<tr>' + td + '</tr>';
    }
    $('#flag-list').append(table);
}


function countDown() {
    $('#clock').countdown('2019/04/5 23:59:56')
        .on('update.countdown', function (event) {
            var format = '%H:%M:%S';
            if (event.offset.totalDays > 0) {
                format = '%-d day%!d ' + format;
            }
            if (event.offset.weeks > 0) {
                format = '%-w week%!w ' + format;
            }
            $(this).html(event.strftime(format));
        }) 
        .on('finish.countdown', function (event) {
            $(this).html('This offer has expired!')
                .parent().addClass('disabled');
        });
}

obj = {
    question: "1 loại trang phục truyền thống của Nhật Bản là?",
    type: "",
    url: "",
    choice: [ 
            "Kimono",
            "Hanbock",
            "Docomo",
            "Kinomo",
    ],
    answer: "Kinomo" 
};
questions = [
    {
        question: "What HTML stands for?",
        type: "",
        url: "",
        choice: [ 
            "Hypertext Markup Language",
            "Hypertext Makeup Language",
            "Hollyshit Markup Language",
            "Hypertext Makeup Layout",
        ],
        answer: "Hypertext Markup Language"      
    },

    {
        question: "Đây là đâu?",
        type: "image",
        url: "./assets/questions/01/5_khuevancac.jpg",
        choice: [ 
            "Trái đất",
            "Mặt trời",
            "Sao hỏa",
            "Thiên hà khác",
        ],
        answer: "Trái đất"      
    },

    {
        question: "Kết quả phép tính 1 + 1 = ... là?",
        type: "",
        url: "",
        choice: [ 
            "2",
            "1",
            "0",
            "3",
        ],
        answer: "2"      
    },

    {
        question: "Nhạc sĩ nào sáng tác Tiến Quân Ca?",
        type: "",
        url: "",
        choice: [ 
            "Phạm Tuyên",
            "Văn Cao",
            "Hồ Chí Minh",
            "Trịnh Công Sơn",
        ],
        answer: "Văn Cao"      
    },

    {
        question: "Ngô Quyền Đại thắng quân Nam Hán năm bao nhiêu?",
        type: "",
        url: "",
        choice: [ 
            "938",
            "991",
            "1010",
            "48",
        ],
        answer: "938"      
    },

    {
        question: "1 loại trang phục truyền thống của Nhật Bản là?",
        type: "",
        url: "",
        choice: [ 
            "Kimono",
            "Hanbock",
            "Docomo",
            "Kinomo",
        ],
        answer: "Kinomo"      
    },

    {
        question: "I like reading books .........tell about peoples and their cultures.",
        type: "",
        url: "",
        choice: [ 
            "which",
            "whom",
            "whose",
            "who",
        ],
        answer: "which"      
    },

    {
        question: "The house was too expensive, .........we couldn’t afford to buy it.",
        type: "",
        url: "",
        choice: [ 
            "however",
            "but",
            "because",
            "so",
        ],
        answer: "so"      
    },

    {
        question: "_____________advances in computing and telecommunications have reduced the need for many people to travel to work.",
        type: "",
        url: "",
        choice: [ 
            "Technology",
            "Technological",
            "Technologist",
            "Technologically",
        ],
        answer: "Technological"      
    },
    {
        question: "Hãy cho biết đây là tiếng kêu của con vật nào?",
        type: "audio",
        url: "./assets/questions/01/assets-test/horse.mp3",
        choice: [ 
            "Ngựa",
            "Mèo",
            "Chó",
            "Gà",
        ],
        answer: "Antman & Thanos"      
    },

    {
        question: "Đặc điểm nào sau đây không đúng với vị trí địa lí của nước ta?",
        type: "",
        url: "",
        choice: [ 
            "Nằm ở rìa phía đông của bản đảo Đông Dương, gần trung tâm khu vực Đông Nam Á.",
            "Tiếp giáp với Trung Quốc và tất cả các nước của khu vực Đông Nam Á.",
            "Vừa gắn liền với lục địa Á - Âu, vừa tiếp giáp với Biển Đông.",
            "Nằm trong khu vực múi giờ số 7.",
        ],
        answer: "Tiếp giáp với Trung Quốc và tất cả các nước của khu vực Đông Nam Á."      
    },
    {
        question: "Trong video chế dưới đây, có 2 nhân vật nổi tiếng nào?",
        type: "video",
        url: "./assets/questions/01/assets-test/agn4nxW_460svvp9.webm",
        choice: [ 
            "Antman & Thanos",
            "Antman & Hulk",
            "Ironman & Thanos",
            "Batman & Thanos",
        ],
        answer: "Antman & Thanos"      
    },

    {
        question: "Vùng có mật độ dân số cao nhất nước ta là?",
        type: "",
        url: "",
        choice: [ 
            "Đồng bằng sông Hồng",
            "Đồng bằng sông Cửu long",
            "Đông Nam Bộ",
            "Duyên hải miền trung",
        ],
        answer: "Đồng bằng sông Hồng"      
    },
];

tempHTML = '<div id="Q6" class="question-item">' +
                '<div class="question">' +
                    '<span class="question-numer">Câu 6: </span>' +
                        '<span class="question-text">Tỉnh nào sau đây có diện tích lớn nhất nước ta? </span>'+
                '</div>' +
                '<div class="image">' +
                    '<img />'+
                '</div>' +
                '<div class="sound">' +
                '</div>' +
                '<div class="video">'+
                '</div>' +
                '<div class="answer">' +
                    '<label>'+
                        '<input type="radio" name="quesion6" value="4" />' +
                                        
                    '</label>'+
                    '<label>' +
                        '<input type="radio" name="quesion6" value="2" />' +
                        '</label>' +
                        '<label>' +
                            '<input type="radio" name="quesion6" value="3" />' +
                            '</label>' +
                            'label>'+
                                '<input type="radio" name="quesion6" value="1" />' +
                            '</label>'+
                '</div>'+
                        '</div>' +
                    '</div>';

function loadQuestion() {
    let htmlCode;
    for(let i = 0; i < questions.length; i++){
        var choiceHTML = '';
        var type = '';
        for(let j = 0; j < questions[i].choice.length; j++) {
            let alphabet = ['A', 'B', 'C', 'D'];
            let choice = questions[i].choice[j];
            // for="Q'+(i+1)+'"
            choiceHTML = choiceHTML + '<label>'+
                        '<input type="radio" name="Q'+ (i+1) +'" value="'+ (choice)  +'" />'+ alphabet[j]+ '. ' +
                        (choice)+                  
                       '</label>';
            if(questions[i].type == 'text')
                type = '';
            else if (questions[i].type == 'audio')
                type = '<audio controls>' +
                            '<source src="'+ questions[i].url +'">' +
                            +'Your browser does not support the audio element.'+
                        '</audio>';
            else if(questions[i].type == 'video') 
                type = '<video controls>' +
                '<source src="'+ questions[i].url +'">' +
                +'Your browser does not support the video element.'+
                '</video>';
            else if(questions[i].type == 'image') {
                type = '<img src="' + questions[i].url + '">';
            }
        }

        tempHTML = '<div id="Q'+(i+1)+'" class="question-item nb-card">' +
                        '<div class="question">' +
                            '<span class="question-number">Câu '+ (i + 1) +': </span>' +
                                '<span class="question-text">'+ questions[i].question + '</span>'+
                        '</div>' +
                        '<div class="q-type ' + questions[i].type +'">' +
                            type +
                        '</div>' +
                        '<div class="answer">' +
                            choiceHTML +
                        '</div>'+
                    '</div>';
        $('#questions-place').append($.parseHTML(tempHTML));
    };
};

function saveAnswerToObj(name, value) {
    order = parseInt(name.slice(1,name.length));
    myObj[order-1] = value;
    console.log(myObj);
  }
  var myObj = [];

$(document).ready(function(){
    loadQuestion();
    $('input:radio').change(function(){
        saveAnswerToObj(this.name, this.value);
        let order = parseInt(this.name.slice(1,this.name.length));
        checkedFlag(order);
      });  
    $('#submit-test').click(submitExam);

    $('#close-manager').click(()=>{
        let isShowing =$('.exam-manager').hasClass('showing');
        let isHidden = $('.exam-manager').hasClass('hidden-c')
        if(isHidden===false && isShowing === false) {
            $('.exam-manager').addClass('hidden-c');
        }
        else if( isShowing === true) {
            $('.exam-manager').removeClass('showing');
            $('.exam-manager').addClass('hidden-c');

        }
        else if(isHidden === true){
            $('.exam-manager').removeClass('hidden-c');
            $('.exam-manager').addClass('showing');
        }
    });
});

function submitExam() {
    let done = true;
    for(let i = 0; i < myObj.length; i++) {
        console.log(myObj[i]);

        if(myObj[i] === undefined){
            done = false;
            break;
        }

    }
    // myObj.forEach(element => {
    //     console.log(element);
    //     if(element === undefined)
    //         done = false;
    // });
    if(done === false) {
        alert('Bạn chưa hoàn thành! Nộp luôn?')
    }
    else {
        alert('Hello')
    }
}

function checkedFlag(order) {
    console.log(order);
    $('#flag-' + order).addClass('flag-checked');
    console.log('added');
}

