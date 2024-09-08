import Gap from "../models/Gap";

export const getGaps = async (req, res) => {
  try {
    const gaps = Gap.find({});
    return res.status(200).json({
      gaps,
      status: "success",
      message: "Berhasil menagkaps semua gap!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};
