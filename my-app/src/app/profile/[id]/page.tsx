export default async function Profilepage(
    { params }: { params: { id: string } }) 
    {
    // Next.js dynamic route params are already available (no need to await)
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-3xl font-bold">Profile Page</h1>
            <p className="mt-4">Welcome to your profile! : {params.id}</p>
        </div>
    );
}
