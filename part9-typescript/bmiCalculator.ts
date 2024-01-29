const BMI = [
  { threshold: 16, category: 'Underweight (Severe thinness)' },
  { threshold: 17, category: 'Underweight (Moderate thinness)' },
  { threshold: 18.5, category: 'Underweight (Mild thinness)' },
  { threshold: 25, category: 'Normal (healthy weight)' },
  { threshold: 30, category: 'Overweight (Pre-obese)' },
  { threshold: 35, category: 'Obese (Class I)' },
  { threshold: 40, category: 'Obese (Class II)' },
  { threshold: Infinity, category: 'Obese (Class III)' },
];

const calculateBmi = (height: number, weight: number): string => {
  if (height <= 0 || weight <= 0) {
    throw new Error('Invalid height or weight');
  }

  const bmi = weight / (height / 100) ** 2;

  for (const { threshold, category } of BMI) {
    if (bmi < threshold) return category;
  }

  throw new Error('BMI calculation failed');
};

try {
  const bmiCategory = calculateBmi(180, 75);
  console.log(bmiCategory);
} catch (error) {
  console.error(error);
}
