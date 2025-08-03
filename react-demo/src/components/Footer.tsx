
export const Footer = () => {
  return (
    <footer className="bg-sky-900  border-t-2  border-solid border-red-300 fixed w-full  bottom-0 text-2xl text-white ">
      &copy; {new Date().getFullYear()} MyApp. All rights reserved.
    </footer>
  );
}
