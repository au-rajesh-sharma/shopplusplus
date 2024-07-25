import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
);

//will be called on a user instance (this). compares and returns true/false
// userSchema function, will be called on a user instance.
userSchema.methods.matchPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password)
}

// Match user entered password to hashed password in database
// pre save trigger
userSchema.pre('save', async function (next) {
  //if password field is not involved, don't do anything
  
  if(!this.isModified('password')) { next() } 
  else {
  //otherwise, encrypt password and save in the current transaction
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
}
})

const User = mongoose.model('User', userSchema);
//const User = mongoose.model('users', userSchema);

export default User;
