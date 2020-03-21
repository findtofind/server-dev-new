import mongoose from 'mongoose';

mongoose
  .connect(
    'mongodb+srv://findtofind:findtofind27022020@cluster0-a1dmg.mongodb.net/test?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  )
  .then(() => {
    console.log('Database is connected.');
  })
  .catch(err => console.log(err));
