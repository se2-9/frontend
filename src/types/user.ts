export interface User {
  id: string;
  name: string;
  email: string;
  verifyStatus: boolean;
  dateOfBirth: string;
  citizenId: string;
  phoneNumber: string;
  role: 'student' | 'tutor';
  password: string;
  gender: string
  // tutor only
  tutorPortfolio: string | undefined;
  tutorEducationLevel: string | undefined;
}
