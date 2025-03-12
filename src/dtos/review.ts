import { PostDTO } from './post';

export interface ReviewDTO {
  id: string;
  tutor_id: string;
  student_id: string;
  post_id: string;
  subject: string;
  rating: number;
  created_at: Date;
  post: PostDTO;
}
