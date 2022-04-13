interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseInputs {
  target: number;
  exerciseHours: number[];
}

const parseArgsExercise = (args: Array<string>): ExerciseInputs => {
  if (args.length < 4)
    throw new Error("supply >2 args as such <target> <hour1> <hour2>...");

  const target = +args[2];
  if (isNaN(target)) throw new Error("Please supply target as number");

  const argsNum = args.slice(3).map(Number);
  for (const num of argsNum) {
    if (isNaN(num)) throw new Error("Please only supply numeric values");
  }
  return {
    target,
    exerciseHours: argsNum,
  };
};

export const calculateExercises = (
  exerciseHours: number[],
  target: number
): Result => {
  const average: number =
    exerciseHours.reduce((prev, cur) => prev + cur, 0) / exerciseHours.length;
  let rating: number;
  let ratingDescription: string;
  const diff = target - average;

  if (diff <= 0) {
    rating = 3;
    ratingDescription = "exceeded target, nice";
  } else if (diff > 0 && diff <= 0.5) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "too bad";
  }
  return {
    periodLength: exerciseHours.length,
    trainingDays: exerciseHours.filter((hour) => hour > 0).length,
    success: average > target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

// npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4
if (require.main === module) {
  try {
    const { target, exerciseHours } = parseArgsExercise(process.argv);
    console.log(calculateExercises(exerciseHours, target));
  } catch (error: unknown) {
    let errorMsg = "Something bad happened ";
    if (error instanceof Error) {
      errorMsg += error.message;
    }
    console.log(errorMsg);
  }
}
