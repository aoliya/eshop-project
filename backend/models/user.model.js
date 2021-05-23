import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      isAdmin: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  )

userSchema.methods.matchPassword = async function(enteredPassword){
   return await bcrypt.compare(enteredPassword, this.password)
}

//encrypting a pass (before saving we run function)
userSchema.pre('save', async function (next){
    //if password was not modified
    if(!this.isModified('password')){
        next()
    }
  //if pass was modified then need to hash it
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User;