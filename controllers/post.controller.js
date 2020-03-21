import Post from '../models/post';

export const getAllPosts = async (req, res) => {
  const posts = await Post.find({ status: '0' });
  res.json(posts);
};

export const getPosts = async (req, res) => {
  const posts = await Post.find({ status: '1' });
  res.json(posts);
};

export const addPost = async (req, res) => {
  const {
    language,
    country,
    city,
    sector,
    companyName,
    address,
    status,
    telephone,
    facebookLink,
    instagramLink,
    email,
    description
  } = req.body || {};

  const newPost = new Post({
    language,
    country,
    city,
    sector,
    companyName,
    address,
    status,
    telephone,
    facebookLink,
    instagramLink,
    email,
    description,
    createdAt: new Date().toISOString()
  });

  const isAdded = await newPost.save();
  if (isAdded) {
    return res
      .status(200)
      .json({ error: false, message: 'Post is added successfully.' });
  }
  return res
    .status(404)
    .json({ error: true, message: 'Post could not be added!' });
};

export const searchPost = async (req, res) => {
  const { sector = '', language = '', city = '', country = '' } =
    req.body || {};
  let query = {
    sector: { $regex: sector, $options: 'i' },
    language: { $regex: language, $options: 'i' },
    city: { $regex: city, $options: 'i' },
    country: { $regex: country, $options: 'i' }
  };
  const post = await Post.find(query)
    .limit(10)
    .sort({ createdAt: -1 });
  return res.json({ post });
};

export const approvePost = async (req, res) => {
  const { id } = req.body || {};
  await Post.findByIdAndUpdate(
    id,
    { $set: { status: '1' } },
    { new: true },
    function(err, result) {
      if (err) {
        console.log(err);
      }
      return res.status(200).json({ message: 'Post updated successfully!' });
    }
  );
};
