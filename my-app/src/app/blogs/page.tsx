// src/app/blogs/page.tsx
"use client"
import React from 'react';

const page = () => {
    const [data, setData] = React.useState<any[]>([]);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/blog/apireq?id=50");
                if (!response.ok) throw new Error(`Request failed: ${response.status}`);
                const json = await response.json();
                if (!Array.isArray(json)) throw new Error("Unexpected response format");
                setData(json);
            } catch (e: any) {
                console.error(e);
                setError(e?.message ?? "Failed to load");
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <div className="m-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-1">
                {error && <p className="text-red-500">{error}</p>}
                {!error && data.map((item: any) => {
                    return (
                        <div key={item.id} className="border border-blue-200 p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
                            <img src= "https://picsum.photos/id/237/200/300" alt="helloworld" className="w-full h-32 object-cover rounded-md mb-2" />
                            <h2 className="text-lg font-semibold">{item.title}</h2>
                            <p className="text-sm text-gray-500">{new Date(item.published).toLocaleString()}</p>
                            <p className="mt-2 text-gray-700">{item.summary}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default page;