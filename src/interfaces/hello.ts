import { Document } from 'mongoose';

export default interface Ihello extends Document {
    name: string;
    info: string;   
}