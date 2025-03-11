import { PostCard } from '@/components/posts/post-card';
import { PostDTO, PostWithTutorDTO } from '@/dtos/post';
import { TutorContactDTO } from '@/dtos/user';

interface PostWithTutorListProps {
  posts: PostWithTutorDTO[];
}

export const PostMatchedList = ({ posts }: PostWithTutorListProps) => {
  return (
    <div className="w-full flex flex-col gap-4">
      {posts.map((post) => {
        const postData: PostDTO = {
          post_id: post.post_id,
          user_id: "", 
          username:  "",
          email:  "",
          title: post.title,
          subject: post.subject,
          tutor_gender: post.tutor_gender,
          is_online: post.is_online,
          place: post.place,
          hourly_rate: post.hourly_rate,
          description: post.description,
          created_at: post.created_at,
        };

        const tutorData: TutorContactDTO = {
          id: post.tutor_id,
          name: post.tutor_name,
          email: post.tutor_email,
          phone_number: post.tutor_phone_number,
        };

        return (
          <PostCard key={post.post_id} post={postData} tutorInfo={tutorData} />
        );
      })}
    </div>
  );
};
