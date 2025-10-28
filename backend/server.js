const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// require đúng đường dẫn
const usersRouter = require('./routes/users');

// mount router: mỗi phần tử trong app.use phải là function/router hợp lệ
app.use('/api/users', usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});