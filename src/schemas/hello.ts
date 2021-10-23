import mongoose, { Schema } from 'mongoose';
import Ihello from '../interfaces/hello';

const helloSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        info: { type: String, required: true},
    },
    {
        timestamps: true
    }
);

// helloSchema.post<Ihello>('save' () => {
//     this.extraInformation = "default info" // 스키마에 추가해야 활성화됨
// })

export default mongoose.model<Ihello>('Hello', helloSchema)