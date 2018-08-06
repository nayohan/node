const mongoose = require('mongoose');

//스키마
const userSchema = new mongoose.Schema({
    userid: {type: String, required: true, unique: true},
    link: {type: String, required: true},
});

//전체 조회
userSchema.statics.findAll = function () {
    return this.find({ });
};

//유저 조회
userSchema.statics.findOneByUserid = function (userid) {
    return this.findOne({ userid });
};


//유저 생성
userSchema.statics.create = function (payload) {
        const userdata = new this(payload);
        return userdata.save();
};

//유저 업데이트
userSchema.statics.updateByUserid = function (userid, payload) {
    return this.findOneAndUpdate({ userid }, payload, { new: true });
};

//유저 삭제
userSchema.statics.deleteByUserid = function (userid) {
    return this.remove({ userid });
};

//모듈export 
module.exports = mongoose.model('User', userSchema);