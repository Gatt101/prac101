export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          {/* Outer spinning ring */}
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          {/* Inner pulsing dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-3 w-3 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="text-white text-xl mt-4 font-medium">Loading papers...</p>
        <p className="text-gray-400 mt-2">Discovering the latest research</p>
      </div>
    </div>
  );
}