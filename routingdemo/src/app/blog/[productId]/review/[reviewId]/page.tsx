export default async function reviewPage({
    params
}: {
    params : Promise<{ productId: string; reviewId: string }>
}) {
    const { productId, reviewId } = await params;
    return <h1 className=" text-3xl text-cyan-500"> Review : {reviewId} for {productId} </h1>
}