import { Document } from 'mongoose';

export default interface IUser extends Document {
    id: string;
    password: string;
    username: string;
    phone: string;
    region: string;
}