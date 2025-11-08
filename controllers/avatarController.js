const cloudinary = require('../config/cloudinary');
const User = require('../models/User');

exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Chưa chọn ảnh" });

    // Upload ảnh lên Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { folder: "avatars" },
      async (error, result) => {
        if (error) return res.status(500).json({ message: error.message });

        // Cập nhật URL avatar cho user
        const user = await User.findById(req.body.userId);
        if (!user) return res.status(404).json({ message: "User không tồn tại" });

        user.avatar = result.secure_url;
        await user.save();

        res.json({ message: "Upload avatar thành công", avatar: user.avatar });
      }
    );

    // Pipe file buffer vào cloudinary
    result.end(req.file.buffer);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};
