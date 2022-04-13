/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";

import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

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

app.post("/exercises", (req, res) => {
  let target: any = req.body.target;
  let dailyExercises: any[] = req.body.daily_exercises;

  if (!target || !dailyExercises) {
    return res.status(400).json({ error: "parameters missing" });
  }

  target = +target;
  if (isNaN(target as number)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  dailyExercises = dailyExercises.map(Number);
  for (const exercise of dailyExercises) {
    if (isNaN(exercise as number)) {
      return res.status(400).json({ error: "malformatted parameters" });
    }
  }

  return res.json(
    calculateExercises(dailyExercises as number[], target as number)
  );
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
