// src/app/profile/[id]/page.tsx
export default async function ProfilePage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold">Profile Page</h1>
      <p className="mt-4">Welcome to your profile: {id}</p>
    </div>
  );
}
