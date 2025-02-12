import { usePosts } from '@/hooks/usePosts';
import { PostCard } from '@/components/posts/post-card';
import { useState } from 'react';
import { PostDTO } from '@/dtos/post';

export const PostList = () => {
  const { data: posts, isLoading, error } = usePosts();
  const [postList, setPostList] = useState<PostDTO[]>(posts?.result || []);

  console.log(postList);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDelete = (postId: string) => {
    setPostList((prev) => prev.filter((post) => post.post_id !== postId));
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {postList.map((post) => (
        <PostCard
          key={post.post_id}
          post={post}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};
