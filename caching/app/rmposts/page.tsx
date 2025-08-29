import { cache } from "react";

const getPost = cache(async () => {
    const res = await fetch('http://localhost:5000/posts')
    console.log("reqhit1")
    return res.json();
})

export default async function PostsPage() {
    const post1 = await getPost();
    const post2 = await getPost(); // Using the same memoized function
   const post3 = await getPost(); // Using the same memoized function
    return (
        <div className=" flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl m-4">Posts</h1>
            <div className="grid grid-cols-2 gap-7">
                {
                    post1.map((post: { id: number; title: string; body: string; author: string }) => (
                        <div key={post.id}>
                            <p> {post.id} </p>
                            <h2>{post.title}</h2>
                            <h5>{post.author}</h5>
                        </div>
                    ))
                }
            </div>
            <div className="grid grid-cols-2 gap-7">
                {
                    post2.map((post: { id: number; title: string; body: string; author: string }) => (
                        <div key={post.id}>
                            <p> {post.id} </p>
                            <h2>{post.title}</h2>
                            <h5>{post.author}</h5>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}