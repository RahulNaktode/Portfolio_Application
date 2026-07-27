import Message from "../models/Message.js";

const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    const messages = await Message.create({
      name,
      email,
      message,
    });

    res.json({
      success: true,
      message: "Message sent successfully",
      data: messages,
    });
  } catch (error) {
    console.error("Create Message Error:", error);
    res.json({
      success: false,
      message: "Server error",
    });
  }
};

export { createMessage }