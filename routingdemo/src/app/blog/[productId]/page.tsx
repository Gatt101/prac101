 export default async function name({
    params
 } : {
    params : Promise<{ productId: string }>
 } ) {
    const productId = params.then(p => p.productId);
    return (
        <div className="items-center justify-center h-screen flex">
            <h1 className="text-3xl text-cyan-600 text-center">
                This is the blog page for product ID: {productId}
            </h1>
        </div>
    );
}