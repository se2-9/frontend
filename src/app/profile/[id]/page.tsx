type props = {
  params: { id: string };
};

export default function ProfilePage({ params }: props) {
  const { id } = params;
  return (
    <div>
      {id}
    </div>
  );
}
