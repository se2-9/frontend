import { UserDTO } from '@/dtos/user';
import { User } from '@/types/user';

export function DtoToUser(dto: UserDTO): User {
  return {
    id: dto.id,
    name: dto.name,
    email: dto.email,
    verifyStatus: dto.verify_status,
    dateOfBirth: dto.date_of_birth,
    citizenId: dto.citizen_id,
    phoneNumber: dto.phone_number,
    role: dto.role,
    gender: dto.gender,
    tutorPortfolio: dto.tutor_portfolio,
    tutorEducationLevel: dto.tutor_education_level,
  };
}
// export function EditDtoToUser(dto: UserEditDTO): User {
//   return {
//     id: dto.id,
//     name: dto.name,
//     email: dto.email,
//     verifyStatus: dto.verify_status,
//     dateOfBirth: dto.date_of_birth,
//     citizenId: dto.citizen_id,
//     phoneNumber: dto.phone_number,
//     role: dto.role,
//     password: dto.password,
//     gender: dto.gender,
//     tutorPortfolio: dto.tutor_portfolio,
//     tutorEducationLevel: dto.tutor_education_level,
//   };
// }
