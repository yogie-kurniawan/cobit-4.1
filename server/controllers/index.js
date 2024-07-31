import Answer from "../models/Answer";

const getMaturityLevel = (value, questionNumber) => {
  const valueTotal = value.reduce((acc, curr) => acc + curr, 0);
  const maturityLevel = valueTotal / questionNumber;
  return { maturityLevel, index: maturityLevel };
};

export const getIndex = async (req, res) => {
  try {
    const answers = await Answer.find({});
    const indexes = answers.forEach((answer) => {
      const maturityLevel = getMaturityLevel({}, questionNumber);
    });
    return res.status(200).json({ indexes, message: "@" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
