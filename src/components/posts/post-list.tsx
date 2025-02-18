import { PostCard } from '@/components/posts/post-card';
import { useState } from 'react';
import { PostDTO } from '@/dtos/post';

interface PostListProps {
  posts: PostDTO[];
}

export const PostList = ({ posts }: PostListProps) => {
  const [postList, setPostList] = useState<PostDTO[]>(posts || []);

  const handleDelete = (postId: string) => {
    setPostList((prev) => prev.filter((post) => post.post_id !== postId));
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {postList.map((post) => (
        <PostCard
          isRequest={false}
          key={post.post_id}
          post={post}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};
