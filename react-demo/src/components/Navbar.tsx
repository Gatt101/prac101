
const Navbar = () => {
  return (
    <nav className="w-full bg-blue-700 py-4 px-8 flex items-center justify-between">
      <div className="text-white text-2xl font-bold">MyApp</div>
      <ul className="flex gap-6">
        <li className="text-white hover:underline cursor-pointer">Home</li>
        <li className="text-white hover:underline cursor-pointer">About</li>
        <li className="text-white hover:underline cursor-pointer">Contact</li>
      </ul>
    </nav>
  );
};

export default Navbar;
