// Import các "công cụ"
const User = require('../models/User'); // Import "khuôn"
const bcrypt = require('bcryptjs'); // Thư viện mã hóa
const jwt = require('jsonwebtoken'); // Thư viện tạo token

// 1. CHỨC NĂNG ĐĂNG KÝ (SIGNUP)
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Yêu cầu: Kiểm tra email trùng
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email này đã tồn tại.' });
    }

    // Yêu cầu: Mã hóa mật khẩu (bcrypt)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Tạo user mới từ "khuôn"
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Lưu vào database
    await newUser.save();

    // Trả về thành công
    res.status(201).json({ message: 'Đăng ký thành công!' });

  } catch (error) {
    res.status(500).json({ message: 'Lỗi server: ' + error.message });
  }
};

// 2. CHỨC NĂNG ĐĂNG NHẬP (LOGIN)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Yêu cầu: Xác thực email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng.' });
    }

    // Yêu cầu: Xác thực password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng.' });
    }

    // Yêu cầu: Trả về JWT token
    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role
    };

    // Tạo token với khóa bí mật từ file .env
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET, // Lấy từ file .env
      { expiresIn: '1h' } // Token hết hạn sau 1 giờ
    );

    // Trả token về cho SV2
    res.status(200).json({
      message: 'Đăng nhập thành công!',
      token: token
    });

  } catch (error) {
    res.status(500).json({ message: 'Lỗi server: ' + error.message });
  }
};

// 3. CHỨC NĂNG ĐĂNG XUẤT (LOGOUT)
exports.logout = (req, res) => {
  // Yêu cầu: "xóa token phía client."
  // Việc này là của SV2 (Frontend) làm.
  // API của bạn chỉ cần gửi 1 thông báo là đã nhận lệnh.
  res.status(200).json({ message: 'Đã nhận yêu cầu đăng xuất.' });
};