export interface UserDTO {
  id: string;
  name: string;
  email: string;
  verify_tatus: boolean;
  date_of_birth: Date;
  citizen_id: string;
  phone_number: string;
  role: 'student' | 'tutor';

  // tutor only
  tutor_portfolio: string | undefined;
  tutor_education_level: string | undefined;
}
