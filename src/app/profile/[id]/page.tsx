type props = {
  params: { id: string };
};

export default function Page({ params }: props) {
  const { id } = params;
  return (
    <div>
      {id}
    </div>
  );
}
