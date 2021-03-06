const mongoose = require ('mongoose')
const {Schema}= mongoose
const bcrypt= require('bcrypt')




const userSchema = new Schema({
    email:{
      type: String,
      required: true
    },
    password: {type: String,
    required:true
    },
    created_at:{
      type: Date,
      default: new Date()
    }
});
/* */
userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  const hash = bcrypt.hash(password, salt)
  return hash;
}

userSchema.methods.confirmPassword = function(password, cb){
return bcrypt.compare(password, this.password,function(err, isMatch) {
  if (err) return cb(err);
  cb(null, isMatch);
} )
}

module.exports=mongoose.model('User', userSchema) 