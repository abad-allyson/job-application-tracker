export default function useUtils() {
  const requiredRule = (v) => !!v || "Required";

  const emailRule = (v) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!v) return true;
    return regex.test(v) || "Please enter a valid email address";
  };

  const passwordRule = (v) =>
    (!!v && v.length >= 8) || "Password must be at least 8 characters long";

  const confirmPasswordRule = (newPassword) => (v) =>
    v === newPassword || "Passwords must match";

  const salaryRule = (v) => {
    if (!v) return true;
    return (
      /^[0-9,\-]+$/.test(v) || "Only numbers, commas, and dashes are allowed"
    );
  };

  return {
    requiredRule,
    emailRule,
    passwordRule,
    confirmPasswordRule,
    salaryRule,
  };
}
