import { Schema, model } from 'mongoose';

const postSchema = new Schema({
  language: String,
  country: String,
  city: String,
  sector: String,
  companyName: String,
  address: String,
  status: String,
  telephone: String,
  facebookLink: String,
  instagramLink: String,
  email: String,
  description: String,
  createdAt: String
});

export default model('Post', postSchema);
