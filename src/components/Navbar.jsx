import { navLinks } from "../contants";

const Navbar = () => {

  return (
    <nav className="top-nav bg-yellow-300 duration-500 transition-all w-[100%] ease-in text-invert sticky top-0 mx-auto z-[99]">
      <div className="nav-container  flex items-center justify-between px-10 py-5">
        <a href="#" className="flex items-center gap-2 font-bold">
          <p>GSAP Workshop</p>
        </a>

        <ul className="flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a href={link.path}>{link.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
