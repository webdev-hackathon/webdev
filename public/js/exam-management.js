(function ($) {
    $('.add-question').click(function (event) {
        localStorage.clear();
        let made = $(this).data('made');
        let soluong = $(this).data('data-soluong');
        event.preventDefault();
        localStorage.setItem(made, soluong);
    });
    $.ajax({
        url: "http://localhost:3000/api/exam",
        method: "get",
        success: function (res) {
            console.log(res);
            res.exams.forEach(exam => {
                if (exam.estatus)
                    exam.estatus = "processed"
                else exam.estatus = "denied";
                var html = `                                                <tr class="tr-shadow">
        <td>
            <label class="au-checkbox">
                <input type="checkbox">
                <span class="au-checkmark"></span>
            </label>
        </td>
        <td>${exam.eid}</td>
        <td>
            <span class="block-email">${exam.ename}</span>
        </td>
        <td class="desc">${exam.edescription}</td>
        <td>2018-09-27 02:12</td>
        <td>
            <span class="status--${exam.estatus}">${exam.estatus}</span>
        </td>
        <td>${exam.elevel}</td>
        <td class="text-center">${exam.eqtyQuestion}</td>
        <td>
            <div class="table-data-feature">
                <button class="item add-question" data-placement="top"
                    data-made="${exam.eid}" data-soluong="${exam.eqtyQuestion}" title="Add question">
                    <a href="/admin/addQuestion/${exam.eid}&${exam.eqtyQuestion}"><i
                            class="fas fa-plus-circle"></i></a>
                </button>
                <!-- data-soluong = item.soluong -->
                <button class="item" data-toggle="tooltip"
                    data-placement="top" title="View">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="item" data-toggle="tooltip"
                    data-placement="top" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="item" id="delete" data-toggle="tooltip"
                    data-placement="top" onclick="deleteExam('${exam.eid}')" title="Delete">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </td>
    </tr>
    <tr class="spacer"></tr>
`;
                $('#place-exam').append(html);

            });
        },
        error: function (error) {
            console.log(error);
        }
    })
})(jQuery);
function deleteExam(eid){
    $.ajax({
        url:"http://localhost:3000/api/delete/" + eid,
        method:"delete",
        success:(res)=>{
            alert("Delete success");
            console.log(res);
        }
    })
}
function addExam(){
    const examData = {
        eid:$('#eid').val(),
        ename:$('#ename').val(),
        edescription:$('#edescription').val(),
        estatus:$('#estatus').val(),
        elevel:$("input[name='radios']:checked").val(),
        eqtyQuestion:$('#eqtyQuestion').val()
    };
    console.log(examData);
    $.ajax({
        url:"http://localhost:3000/api/create",
        method:"post",
        data:examData,
        success:(res)=>{
            alert("Add exam is "+res.success);
        },
        error:(error)=>{
            alert("Error");
            console.log(error);
        }
    })
}