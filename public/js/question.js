// let made = 10;
// console.log(obj);


// $(document).ready(() => {
//     addQuestion();   
// }) 
var obj = [];

function addQuestion(eid, num) {
    // let made = localStorage.getItem(localStorage.key(0));

    for (let i = 0; i < num; i++) {
        obj[i] = {
            eid : '',
            question : '',
            type : '',
            url: '',
            choice: ['','','',''],
            answer: '',
        }
    }
    if (!eid) {
        $('#question-place').html(`<h1 class="text-center"> Vui lòng chọn mã đề để thêm câu hỏi !  </h1>`);
        $('.save-question').remove();
    }
    else {
        $('#question-place').append(`<h1 class="text-center"> Thêm câu hỏi cho đề ${eid}  </h1>`);
        for (var i = 0; i < num; i++) {
            var questionFmt = `<div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" >

        <div class="input-group card card-question">

            <div class="form-group">
                <label for="textarea" class="col-sm-10 control-label question-num">Câu hỏi ${i + 1} </label>
                <textarea name="Q${i + 1}" onchange="handleChangeQuestion('Q${i + 1}');" id="textarea" class="form-control" rows="3" required="required"></textarea>
            </div>
          </div>

            <div class="input-group">
                <label for="sel1">Loại câu hỏi:</label>
                <select name="Q${i + 1}" onchange="handleChangeType('Q${i + 1}')">
                <option disabled selected value> -- Chọn loại câu hỏi -- </option>
                 <option value="-1">text</option>
                 <option value="0">Âm thanh</option>
                 <option value="1">Video</option>
                 <option value="2">Hình ảnh</option>
               </select>
               <div id="Q${i + 1}">
               </div>
            </div>
            <div class="answer-4-value">
                <h5>Điền 4 đáp án và chọn 1 đáp án đúng</h5>
                <div class="radio">
                    <label><input type="radio" name="Q${i + 1}" value="A" >A</label>

                    <input type="text" name="Q${i + 1}" onchange="handle_choice('Q${i + 1}', 0);" class="form-control" value="" pattern="" title="">

                </div>
                <div class="radio">
                    <label><input type="radio" name="Q${i + 1}" value="B">B</label>
                    <input type="text" name="Q${i + 1}" onchange="handle_choice('Q${i + 1}', 1);" class="form-control" value="" pattern="" title="">
                </div>
                <div class="radio">
                    <label><input type="radio" name="Q${i + 1}" value="C">C</label>
                    <input type="text" name="Q${i + 1}" onchange="handle_choice('Q${i + 1}', 2);" class="form-control" value="" pattern="" title="">
                </div>
                <div class="radio">
                    <label><input type="radio" name="Q${i + 1}" value="D">D</label>
                    <input type="text" name="Q${i + 1}" onchange="handle_choice('Q${i + 1}', 3);" class="form-control" value="" pattern="" title="">
                </div>
            </div>
        </div>
    </div>
    </div>
`;
            $('#question-place').append(questionFmt);
        }

    }
}

$(document).ready(()=>{
    $('input:radio').change(function(){
        name = this.name;
        val = this.value;
        num = parseInt(name.slice(1,name.length)) - 1;
        obj[num].answer = val;
        console.log(obj[num].answer);
    });  

    $('#saveBtn').click(()=>{
        sendExamToDataBase();
        stringifyObj();
    })
})


function myFunction() {
    var x = document.getElementById("mySelect").value;
      obj = ['audio/*', 'video/*', 'image/*'];
      html = `<input type="file" value="Upload" accept="${obj[x]}"> <button id="uploadBtn" onclick="upload();">Upload</button>`;
       document.getElementById("Q1").innerHTML = html;
}

function handleChangeQuestion(name) {
    let x = $(`textarea[name=${name}]`).val();
    order = parseInt(name.slice(1,name.length)) - 1;
    obj[order].question = x;
}

function handleChangeType(name) {
    let x = $(`select[name=${name}]`).val();
    order = parseInt(name.slice(1,name.length)) - 1;
    // console.log(order);
    console.log(order + ':' + x);
    // console.log(x);
}

function handle_choice(name, order) {
    let x = $(`input[type='text'][name=${name}]`);
    num = parseInt(name.slice(1,name.length)) - 1;
    obj[num].choice[order] = x[order].value;

}

function sendExamToDataBase() {
    questions = JSON.stringify (obj);
    $.ajax({
        type: "POST",
        url: 'http://localhost:3000/api/addQuestion',
        data: {questions: questions} ,
        success: function (res) {
            console.log(res);
        },
        error: function (e) {
            console.log(e);
        },
    });
}

function stringifyObj() {
    console.log(obj);
}
