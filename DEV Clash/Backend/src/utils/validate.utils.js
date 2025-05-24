export const validateEmail=(role, email)=> {
  if (role === 'student') {
    const cuetStudentEmailRegex = /^u\d{7}@student\.cuet\.ac\.bd$/;
    return cuetStudentEmailRegex.test(email);
  }
  // For other roles (e.g., vendor), you can allow any valid email format:
  const genericEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return genericEmailRegex.test(email);
}
