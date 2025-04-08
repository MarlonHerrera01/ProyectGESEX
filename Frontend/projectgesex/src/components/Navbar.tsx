import { User } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-red-700 text-white px-6 py-4 flex justify-between items-center">
      <img src="/logo.png" alt="Logo" className="h-16" />
      <ul className="flex gap-6 text-lg">
        <li><a href="#" className="hover:underline">Material de apoyo</a></li>
        <li><a href="#" className="hover:underline">Encuesta</a></li>
        <li><a href="#" className="hover:underline">Estadísticas</a></li>
      </ul>
      <User className="w-12 h-12" />
    </nav>
  );
};

export default Navbar;