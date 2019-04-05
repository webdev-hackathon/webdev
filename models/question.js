const mongoose = require('mongoose');
const questionSchema = mongoose.Schema({
    eid:String,
    question: String,
    type: String,
    url: String,
    choice: [],
    answer: String
});
module.exports = mongoose.model('question', questionSchema);

// user = {
//     username:String,
//     password:String,
//     exams:[
//         {
//             eid:"123",//exam id, mã đề
//             status:true,//true đã xong, fasle chưa hoàn thành
//             score:"25/40"
//         },
//         {
//             eid:"456",
//             status:false,
//             score:"15/25"
//         }
//     ],//ex
// }
// exam = { //theo bảng đã tạo trong trang admin quản lý
//     eid:{type:String,unique:true},//mã đề,
//     ename:String,
//     edescription:String,
//     ecreated:{type:Date,default:Date.now},
//     estatus:Boolean,//true : approved, false:denied
//     eqtyQuestion:Number,//số lượng câu hỏi
// }
// question = {
//     eid:String,//mã đề tham chiếu
//     question: String,//câu hỏi
//     type: String,//phân loại text,img,video?
//     url: String,//path img,viedo
//     choice: [],//A,B,C,D
//     answer: String//choice["A"]
// }
// //user nộp bài, bỏ vào 1 object có user id, mã đề, xử lý chấm điểm tại server, return số điểm chấm đc 
// //dựa trên số câu đúng (answer==choice["a"])/qtyQuestion đưa vào exams của user