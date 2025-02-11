import CreatePost from '@/components/create-post';

export default function Page() {
  return (
    <div className="w-full flex items-center justify-center mt-10">
      <div className="w-auto max-w-md ">
        <CreatePost />
      </div>
    </div>
  );
}
