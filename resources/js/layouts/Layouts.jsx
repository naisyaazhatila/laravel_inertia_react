import { Link } from "@inertiajs/react";

// Tambahkan { children } di sini untuk menerima props
export default function Layouts({ children }) { // <--- PERBAIKANNYA
  return (
    <>
      <header>
        <nav>
          <Link className="nav-link" href="/">
            Home
          </Link>
          <Link className="nav-link" href="/posts/create">
            create
          </Link>
        </nav>
      </header>
      
      <main>
        {/* Sekarang 'children' sudah dikenali */}
        {children}
      </main>
    </>
  );
}