import mongoose, { Schema } from 'mongoose';
import IUser from '../interfaces/user';

const UserSchema: Schema = new Schema({
    id: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    phone: { type: String, required: true },
    region: { type: String, required: true },
},
{
    timestamps: true
});

// // helloSchema.post<Ihello>('save' () => {
// //     this.extraInformation = "default info" // 스키마에 추가해야 활성화됨
// // })

export default mongoose.model<IUser>('User', UserSchema);


