import CreatePost from '@/components/create-post';
import MaxWidthWrapper from '@/components/max-width-wrapper';

export default function Page() {
  return (
    <MaxWidthWrapper className="w-full h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md mt-[144px]">
        <CreatePost />
      </div>
    </MaxWidthWrapper>
  );
}
