const fs = require("fs/promises");

const UploadFile = async (req, res) => {
//   console.log(req.files.File1);
  const uploadedFile = req.files.File1;
  await fs.writeFile(uploadedFile.name, uploadedFile.data);
  res.status(200).json({ dutta: 10 });
};

module.exports = { UploadFile };
