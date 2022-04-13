import express = require("express");

import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

//localhost:3003/bmi?height=180&weight=72.
app.get("/bmi", (req, res) => {
  const height = req.query.height as string;
  const weight = req.query.weight as string;

  if (!height || !weight) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const heightCm = +height;
  const weightKg = +weight;

  if (isNaN(heightCm) || isNaN(weightKg)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  return res.json({
    weight: weightKg,
    height: heightCm,
    bmi: calculateBmi(heightCm, weightKg),
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
