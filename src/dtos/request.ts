import { PostDTO } from "./post";

export interface RequestDTO {
  id: string;
  student_id: string;
  tutor_id: string;
  tutor_name: string;
  post_id: string;
  created_at: string;
  status: string;
  post: PostDTO
}
