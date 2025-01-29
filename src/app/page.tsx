import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function Home() {
  return (
    <MaxWidthWrapper className="w-full">
      <div className="flex flex-col gap-6 justify-center items-center h-screen text-center">
        <h1 className="text-5xl font-bold font-noto_sans_th">
          อย่าหาว่าพี่สอน
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          necessitatibus voluptatem delectus eius voluptatibus nesciunt ex?
          Obcaecati quisquam eius voluptas vitae, fugiat sapiente magni impedit
          cum magnam dicta quibusdam veritatis.
        </p>
      </div>
    </MaxWidthWrapper>
  );
}
