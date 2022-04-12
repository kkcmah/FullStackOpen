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

console.log(calculateBmi(180, 74));
