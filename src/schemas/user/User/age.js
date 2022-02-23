const date = new Date();

const currentYear = date.getFullYear();

export const age = (parent) => {
  const calculateBirthdateInAge =
    currentYear - new Date(parent.birthDate).getFullYear();
  return calculateBirthdateInAge;
};
