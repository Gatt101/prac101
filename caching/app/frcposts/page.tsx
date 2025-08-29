
export const revalidate = 60;

interface Post {
  id: number;
  title: string;
  body?: string;
  author: string;
}

async function getPosts(): Promise<Post[]> {
  // NOTE:
  // - No noStore(): allows the route to be static/ISR cached.
  // - We add a tag so you can call revalidateTag('posts') after mutations.
  const res = await fetch("http://localhost:5000/posts", {
    next: { tags: ["posts"] },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  // Server log to see when data was actually fetched (i.e., regeneration time)
  console.log("ISR: fetched /posts at", new Date().toLocaleTimeString());

  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8">
      <h1 className="text-4xl m-4">Posts (Full Route Cache + ISR)</h1>
      <p className="mb-2">This page revalidates every 60 seconds.</p>
      <p className="mb-8 text-gray-500">
        Page rendered at: {new Date().toLocaleTimeString()}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full max-w-4xl px-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded-lg">
            <p className="text-sm text-gray-500">ID: {post.id}</p>
            <h2 className="font-bold text-lg">{post.title}</h2>
            {post.author && <h5 className="text-gray-700">{post.author}</h5>}
          </div>
        ))}
      </div>
    </div>
  );
}
