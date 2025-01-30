import { UserDTO } from '@/dtos/user';
import { User } from '@/types/user';

export function DtoToUser(dto: UserDTO): User {
  return {
    id: dto.id,
    name: dto.name,
    email: dto.email,
    verifyStatus: dto.verify_tatus,
    dateOfBirth: dto.date_of_birth,
    citizenId: dto.citizen_id,
    phoneNumber: dto.phone_number,
  };
}
