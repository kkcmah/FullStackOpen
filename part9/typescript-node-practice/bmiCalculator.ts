interface BmiValues {
  heightCm: number;
  weightKg: number;
}

const parseArgsBmi = (args: Array<string>): BmiValues => {
  if (args.length !== 4)
    throw new Error("supply 2 args as such calculateBmi <heightCm> <weightKg>");
  if (!isNaN(+args[2]) && !isNaN(+args[3])) {
    return {
      heightCm: +args[2],
      weightKg: +args[3],
    };
  } else {
    throw new Error("please supply numeric values");
  }
};

const calculateBmi = (heightCm: number, weightKg: number): string => {
  const bmi = weightKg / (heightCm / 100) ** 2;
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return "Normal (healthy weight)";
  } else {
    return "Obese";
  }
};

// npm run calculateBmi 180 91
try {
  const { heightCm, weightKg } = parseArgsBmi(process.argv);
  console.log(calculateBmi(heightCm, weightKg));
} catch (error: unknown) {
  let errorMsg = "Something bad happened ";
  if (error instanceof Error) {
    errorMsg += error.message;
  }
  console.log(errorMsg);
}
