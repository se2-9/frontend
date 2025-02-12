export interface PostDTO {
  post_id: string;
  user_id: string;
  username: string;
  email: string;
  title: string;
  subject: string;
  tutor_gender: string;
  is_online: boolean;
  place: string;
  hourly_rate: number;
  description: string;
  created_at: string;
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
