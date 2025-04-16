import { UserDTO } from './user';

export interface PostDTO {
  post_id: string;
  user: UserDTO | undefined;
  title: string;
  subject: string;
  tutor_gender: string;
  is_online: boolean;
  place: string;
  hourly_rate: number;
  description: string;
  created_at: string;
}
export interface PostWithIsRequestedDTO {
  post_id: string;
  user: UserDTO | undefined;
  title: string;
  subject: string;
  tutor_gender: string;
  is_online: boolean;
  place: string;
  hourly_rate: number;
  description: string;
  created_at: string;
  is_requested: boolean;
}

export interface PostWithTutorDTO {
  post_id: string;
  title: string;
  subject: string;
  tutor_gender: string;
  is_online: boolean;
  place: string;
  hourly_rate: number;
  description: string;
  created_at: string;
  post_status: string;
  tutor_id: string;
  tutor_phone_number: string;
  tutor_email: string;
  tutor_name: string;
}

export interface FilterPostDTO {
  title: string;
  subject: string;
  place: string;
  min_price: number;
  max_price: number;
  is_online: boolean;
  tutor_gender: string;
  description: string;
}
