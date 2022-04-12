interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
