const mongoose = require('mongoose');
const examSchema = mongoose.Schema({
    eid:{type:String,unique:true},//mã đề,
    ename:String,
    edescription:String,
    ecreated:{type:Date,default:Date.now},
    estatus:Boolean,//true : approved, false:denied
    eqtyQuestion:Number,//số lượng câu hỏi
});
module.exports = mongoose.model('exam',examSchema);