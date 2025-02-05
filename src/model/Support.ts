import mongoose, { Schema, Document } from 'mongoose';

export interface Support extends Document {
    username: string;
    email: string;
    message: string;
}

const SupportSchema: Schema<Support> = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/.+\@.+\..+/, 'Please use a valid email address'],
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
    },
});

const SupportModel = mongoose.models.Support || mongoose.model<Support>('Support', SupportSchema);

export default SupportModel;
