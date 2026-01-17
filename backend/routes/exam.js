router.post("/submit", verifyToken, async (req, res) => {
  const { answers, score } = req.body;

  const student = await Student.findById(req.studentId);

  if (student.hasSubmitted) {
    return res.status(400).json({ message: "Exam already submitted" });
  }

  try {
    const result = new Result({
      studentId: req.studentId,
      answers,
      score
    });

    await result.save();

    student.hasSubmitted = true;
    await student.save();

    res.json({ message: "Exam submitted" });
  } catch {
    res.status(500).json({ message: "Error submitting exam" });
  }
});
