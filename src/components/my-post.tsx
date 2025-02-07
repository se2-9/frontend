'use client';
import * as React from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { deletePost } from '@/lib/api/posts';
type Post = {
  id: string;
  title: string;
  HourlyRate: number;
  OnlineOnsite: string;
};

interface MyPostsProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

export default function MyPosts({ posts, setPosts }: MyPostsProps) {
  async function handleDelete(id: string) {
    try {
      await deletePost(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      toast.success('Post deleted successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Error deleting post');
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Posts</CardTitle>
      </CardHeader>
      <CardContent>
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center">No posts available</p>
        ) : (
          posts.map((post) => (
            <Card key={post.id} className="p-4 mb-4 shadow-md">
              <CardContent>
                <div className="flex justify-between items-center">
                  <CardTitle>{post.title}</CardTitle>
                  <p className="text-md font-semibold">{post.HourlyRate} Bath</p>
                </div>
                <p className="text-sm text-gray-600">{post.OnlineOnsite}</p>
                <div className="flex justify-end mt-4">
                  <Button
                    onClick={() => handleDelete(post.id)}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </CardContent>
    </Card>
  );
}
