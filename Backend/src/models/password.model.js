import mongoose,{Schema} from 'mongoose'

const passwordSchema = new Schema({
    user:{
      type: Schema.Types.ObjectId,
      ref:'User',
      required: true,
    },
    websiteURL: {
      type: String,
      trim: true,
    },
    websiteName: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    }
  })

export const Password=mongoose.model('Password',passwordSchema);