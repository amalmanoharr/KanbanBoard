// src/components/Navbar.tsx

const Navbar = () => {
    return (
      <nav className="w-full bg-mainBackgroundColor h-16 flex items-center justify-between px-6 border-b border-columnBackgroundColor shadow-md">
        <h1 className="text-2xl font-bold text-white">Kanban Board</h1>
        <div className="text-white">Welcome 👋</div>
      </nav>
    );
  };
  
  export default Navbar;