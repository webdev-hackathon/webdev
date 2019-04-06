function addQuestion(made) {
    // let made = localStorage.getItem(localStorage.key(0));
    if (!made) {
        $('#question-place').html(`<h1 class="text-center"> Vui lòng chọn mã đề để thêm câu hỏi !  </h1>`);
        $('.save-question').remove();
    }
    else {
        $('#question-place').append(`<h1 class="text-center"> Thêm câu hỏi cho đề ${made}  </h1>`);
        var qtyExam = 0;
        $.ajax({
            url:"http://localhost:3000/api/exam/"+made,
            method:"get",
            success:(res)=>{
                qtyExam = res.exam.eqtyQuestion;
                for (var i = 0; i < made; i++) {
                    var questionFmt = `<div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" >
        
                <div class="input-group card card-question">
        
                    <div class="form-group">
                        <label for="textarea" class="col-sm-10 control-label question-num">Câu hỏi ${i + 1} </label>
                        <textarea name="question_${i + 1}" id="textarea" class="form-control" rows="3" required="required"></textarea>
                    </div>
        
                    <div class="input-group">
                        <label for="sel1">Loại câu hỏi:</label>
                        <select class="form-control">
                          <option>Văn bản</option>
                          <option>Hình ảnh</option>
                          <option>Âm thanh</option>
                          <option>Video</option>
                          <option>Video Youtube</option>
                          <option>Video Google Drive</option>
                        </select>
                        <input type="file" value="Upload"> 
                        <span>Hoặc URL</span>
                        <input type="text" class="form-control" >
                    </div>
                    <div class="answer-4-value">
                        <h5>Điền 4 đáp án và chọn 1 đáp án đúng</h5>
                        <div class="radio">
                            <label><input type="radio" name="Q${i + 1}" checked>A</label>
        
                            <input type="text" name="Q${i + 1}" class="form-control" value="" pattern="" title="">
        
                        </div>
                        <div class="radio">
                            <label><input type="radio" name="Q${i + 1}">B</label>
                            <input type="text" name="Q${i + 1}" class="form-control" value="" pattern="" title="">
                        </div>
                        <div class="radio">
                            <label><input type="radio" name="Q${i + 1}">C</label>
                            <input type="text" name="Q${i + 1}" class="form-control" value="" pattern="" title="">
                        </div>
                        <div class="radio">
                            <label><input type="radio" name="Q${i + 1}">D</label>
                            <input type="text" name="Q${i + 1}" class="form-control" value="" pattern="" title="">
                        </div>
                    </div>
                </div>
            </div>
            </div>
        `;
                    $('#question-place').append(questionFmt);
                }
            }
        })
        
    }
}
function saveQuestion() {
    alert("AJAX post to save");
}
