export interface User {
  id: string;
  name: string;
  email: string;
  verifyStatus: boolean;
  dateOfBirth: Date;
  citizenId: string;
  phoneNumber: string;
  role: 'student' | 'tutor';

  // tutor only
  tutorPortfolio: string | undefined;
  tutorEducationLevel: string | undefined;
}
