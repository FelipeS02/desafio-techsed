import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const timeout = async (ms: number) =>
  await new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Calculates the percentage difference between two numbers.
 * @param {number} num1 - The first number.
 * @param {number} num2 - The second number.
 * @returns {number} - The percentage difference.
 */
export function getPercentageDifference(num1: number, num2: number) {
  if (num1 === 0 && num2 === 0) {
    return 0; // Both numbers are zero, no difference.
  }

  // Calculate the absolute difference and the average of the two numbers.
  const difference = Math.abs(num1 - num2);
  const average = (Math.abs(num1) + Math.abs(num2)) / 2;

  // Return the percentage difference.
  return Math.ceil((difference / average) * 100);
}
