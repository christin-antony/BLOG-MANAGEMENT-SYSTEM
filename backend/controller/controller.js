import { blogSchema } from "../model/add.js";
export const blogFrom = (req,res) => {
  res.send("blog details");
};

export const blogdata = (req, res) => {
  const { title, description, date } = req.body;

  if (!title || !description || !date || !req.file) {
      return res.status(400).json({ message: "Missing required fields" });
  }
  
  const image = req.file.path;

  const newBlog = new blogSchema({
    title,
    description,
    date,
    image,
  });

  newBlog
    .save()
    .then(() => {
      console.log("New blog data saved successfully");
      res.json({ message: "New blog data saved successfully" });
    })
    .catch((error) => {
      console.error("Error saving the new blog details: ", error);
      res.status(500).send("Error saving data: " + error.message);
    });
};

export const page1 = (req, res) => {
  res.send("hello");
};

export const blogget = async (req, res) => {
  try {
    const blog = await blogSchema.find();
    res.json(blog);
  } catch (error) {
    console.log(console.log(error));
  }
};

export const deletedata = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await blogSchema.findByIdAndDelete(id);
    console.log("Result:", result);
    if (result) {
      res.send("success");
    } else {
      console.log("User not found");
      res.send("User not found");
    }
  } catch (error) {
    console.error("Error:", error);
    res.send("Error deleting user");
  }
};

export const editdata = async (req, res) => {
  try {
    const emp = await blogSchema.findById(req.params.id);
    if (!emp) {
      return res.status(404).send("User not found");
    }
    res.json(emp);
  } catch (err) {
    console.log(err);
    res.send("Server error");
  }
};

export const updatedata = async (req, res) => {
  try {
    const { id } = req.params; 
    const {title, description, date } = req.body; 
    

    let image= "";
    if (req.file) {
      image = req.file.path;
    } else {
 
      const existingPost = await blogSchema.findById(id);
      if (existingPost) {
        image = existingPost.image;
      }
    }

    const updatedPost = await blogSchema.findByIdAndUpdate(
      id, 
      { title, description, date,image}, 
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).send('Post not found');
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};
