exports.find = (req, res) => {
  console.log('hello');
};


/*Not use
//Document data

//Put Document into Collection
newUserinput.save()
 	.then(() => console.log('Successfully saved to mongodb'))
	.catch(e => console.error(e));
*/
/*

//---------------------GET All document
userSchema.statics.findAll = function() {
    return this.find();
};*/



//module.exports = mongoose.model('User', userSchema);