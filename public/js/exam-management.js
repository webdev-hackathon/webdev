(function ($) {
    $('.add-question').click(function (event) {
        localStorage.clear();
        let made = $(this).data('made');
        let soluong = $(this).data('data-soluong');
        event.preventDefault();
        localStorage.setItem(made, soluong);
    })
})(jQuery);
$.ajax({
    url: "localhost:3000/api/exam",
    method: "get",
    success: function (res) {
        console.log(res);
        if (res.status == true) res.status = "processed"
        else res.status = "denied";
        var html = `                                                <tr class="tr-shadow">
        <td>
            <label class="au-checkbox">
                <input type="checkbox">
                <span class="au-checkmark"></span>
            </label>
        </td>
        <td>${res.eid}</td>
        <td>
            <span class="block-email">${res.ename}</span>
        </td>
        <td class="desc">${res.edesc}</td>
        <td>2018-09-27 02:12</td>
        <td>
            <span class="status--${res.status}">${res.status}</span>
        </td>
        <td>${res.elevel}</td>
        <td class="text-center">${res.eqtyQuestion}</td>
        <td>
            <div class="table-data-feature">
                <button class="item add-question" data-placement="top"
                    data-made="3" data-soluong="20" title="Add question">
                    <a href="/admin/addQuestion"><i
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
                <button class="item" data-toggle="tooltip"
                    data-placement="top" title="Delete">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </td>
    </tr>
    <tr class="spacer"></tr>
`;
$('#place-exam').append(html);
    },
    error:function (error) {
        console.log(error);
    }
})