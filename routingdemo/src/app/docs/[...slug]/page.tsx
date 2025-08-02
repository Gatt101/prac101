export default async function normalPage({
    params
}: {
    params: Promise<{ slug: string[] }>
}) {
    const { slug } = await params;
    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-3xl text-blue-600">
                This is a dynamic page for slug: {slug.join('/')}
            </h1>
        </div>
    );
}