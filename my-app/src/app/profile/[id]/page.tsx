export default async function Profilepage({ params }: { params: { id: string } }) {
    // Await params if needed (Next.js expects async for dynamic params)
    const profile = await params; // Assuming you want to use the id from params
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-3xl font-bold">Profile Page</h1>
            <p className="mt-4">Welcome to your profile! : {profile.id}</p>
        </div>
    );
}
