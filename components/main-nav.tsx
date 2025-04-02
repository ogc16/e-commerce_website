import Link from "next/link"

interface MainNavProps {
  className?: string
}

export default function MainNav({ className }: MainNavProps) {
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/categories", label: "Categories" },
    { href: "/sale", label: "Sale" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className={`flex flex-row items-center ${className || ""}`}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex items-center text-sm font-medium transition-colors hover:text-primary mx-4 my-2"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

