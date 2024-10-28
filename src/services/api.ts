const API_URL = 'http://localhost:3000/api';

export const fetchExamples = async (letter: string) => {
  const response = await fetch(`${API_URL}/examples/${letter}`);
  return response.json();
};

export const fetchVowelExamples = async (letter: string) => {
  const response = await fetch(`${API_URL}/vowels/${letter}`);
  return response.json();
};

export const fetchConsonantExamples = async (letter: string) => {
  const response = await fetch(`${API_URL}/consonants/${letter}`);
  return response.json();
};