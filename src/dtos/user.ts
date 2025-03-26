export interface UserDTO {
  id: string;
  name: string;
  email: string;
  verify_status: boolean;
  date_of_birth: string;
  citizen_id: string;
  phone_number: string;
  role: 'student' | 'tutor';
  gender: string;
  password: string;
  // tutor only
  tutor_portfolio: string | undefined;
  tutor_education_level: string | undefined;
}
export interface TutorContactDTO {
  id: string;
  phone_number: string;
  name: string;
  email: string;
}
