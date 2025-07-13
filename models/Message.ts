import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMessage extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

const MessageSchema: Schema = new Schema({
  name: { type: String, required: [true, 'Please provide a name.'], trim: true },
  email: { type: String, required: [true, 'Please provide an email.'], trim: true, match: [/.+@.+\..+/, 'Please enter a valid email address.'] },
  message: { type: String, required: [true, 'Please provide a message.'], trim: true },
  createdAt: { type: Date, default: Date.now }
});

const Message: Model<IMessage> = mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);

export default Message;
