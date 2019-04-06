const admiModel = require('../models/admin');
const examModel = require('../models/exam');
const questionModel = require('../models/question');
module.exports = {
    apiCreateExam: (req, res) => {
        const examData = {
            eid: req.body.eid,
            ename: req.body.ename,
            edescription: req.body.edescription,
            estatus: req.body.estatus,
            eqtyQuestion: req.body.eqtyQuestion,
            elevel: req.body.elevel
        };
        console.log(examData);
        examModel.findOne({ eid: examData.eid })
            .then(existExam => {
                if (existExam)
                    return res.send({err:"Mã đề này đã tồn tại"});
                else return examModel.create(examData);
            })
            .then(newExam => {
                if (newExam) return res.send({ newExam: newExam, success: true });
                else throw new "Lỗi khi tạo đề mới.";
            })
            .catch(err => {
                return res.send({ error: err, success: false });
            })
    },
    apiReadExam: (req, res) => {
        const eid = req.params.eid || "";
        examModel.find({ eid: eid })
            .then(exam => {
                if (exam) return res.send({ exam: exam, success: true });
                else throw new "Error when read db, check syntax or connection";
            })
            .catch(err => {
                return res.send({ error: err, success: false });
            })
    },
    apiReadAllExam: (req, res) => {
        examModel.find({})
            .then(exam => {
                if (exam) return res.send({ exams: exam, success: true });
                else throw new "Error when read db, check syntax or connection";
            })
            .catch(err => {
                return res.send({ error: err, success: false });
            })
    },
    apiAddQuestion: (req, res) => {
        const questionsArr = req.body;
        // questionModel.create(question)
        //         .then(question => {
        //             if (question)
        //                 return res.send({ question: question, success: true });
        //             else throw "Create question error"
        //         })
        //         .catch(err => {
        //             return res.send({ error: err });
        //         });
        questionsArr.forEach(question => {
            console.log(question);
            questionModel.create(question)
                .then(question => {
                    if (question)
                        return res.send({ question: question, success: true });
                    else throw "Create question error"
                })
                .catch(err => {
                    return res.send({ error: err });
                });
        });
    },
    apiDeleteExamById:(req,res)=>{
        const eid = req.params.eid;
        examModel.deleteOne({eid:eid})
        .then(ok => {
            if (ok)
            return res.send({result:ok,success:true});
            else return res.send({result:null,success:false});
        })
        .catch(err=>{
            return res.send(err);
        })
    },
    apiReadQuestion:(req,res)=>{
        const eid = req.params.eid;
        questionModel.find({eid:eid})
        .then(questions=>{
            if (questions){
                return res.send(questions);
            }
            else res.send({err:"K co question"});
        })
        .catch(err=>{
            return res.send({error:err});
        })
    }
}