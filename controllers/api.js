const admiModel = require('../models/admin');
const examModel = require('../models/exam');
module.exports = {
    apiCreateExam: (req, res) => {
        const examData = {
            eid: req.body.eid,
            ename: req.body.name,
            edescription: req.body.desc,
            estatus: req.body.status,
            eqtyQuestion: req.body.qty,
            elevel: req.body.level
        };
        examModel.findOne({ eid: examData.eid })
            .then(existExam => {
                if (existExam)
                    throw new "Mã đề này đã tồn tại";
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
                if (exam) return res.send({ exams: exam, success: true });
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
    }
}