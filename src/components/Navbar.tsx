import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BarChart3, FileText, Home, Settings, Users, Menu, X } from 'lucide-react'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const isActive = (path: string) => {
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <BarChart3 className="h-8 w-8 text-blue-600 mr-2" />
            <span className="font-bold text-xl">BudgetPro</span>
          </Link>
          <div className="hidden md:flex space-x-4">
            <NavLink to="/" icon={<Home />} text="Dashboard" isActive={isActive('/')} />
            <NavLink to="/entities" icon={<Users />} text="Entities" isActive={isActive('/entities')} />
            <NavLink to="/budgets" icon={<FileText />} text="Budgets" isActive={isActive('/budgets')} />
            <NavLink to="/reports" icon={<BarChart3 />} text="Reports" isActive={isActive('/reports')} />
            <NavLink to="/settings" icon={<Settings />} text="Settings" isActive={isActive('/settings')} />
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-600 hover:text-blue-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink to="/" icon={<Home />} text="Dashboard" onClick={toggleMenu} isActive={isActive('/')} />
            <MobileNavLink to="/entities" icon={<Users />} text="Entities" onClick={toggleMenu} isActive={isActive('/entities')} />
            <MobileNavLink to="/budgets" icon={<FileText />} text="Budgets" onClick={toggleMenu} isActive={isActive('/budgets')} />
            <MobileNavLink to="/reports" icon={<BarChart3 />} text="Reports" onClick={toggleMenu} isActive={isActive('/reports')} />
            <MobileNavLink to="/settings" icon={<Settings />} text="Settings" onClick={toggleMenu} isActive={isActive('/settings')} />
          </div>
        </div>
      )}
    </nav>
  )
}

const NavLink: React.FC<{ to: string; icon: React.ReactNode; text: string; isActive: boolean }> = ({ to, icon, text, isActive }) => (
  <Link to={to} className={`flex items-center ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
    {icon}
    <span className="ml-1">{text}</span>
  </Link>
)

const MobileNavLink: React.FC<{ to: string; icon: React.ReactNode; text: string; onClick: () => void; isActive: boolean }> = ({ to, icon, text, onClick, isActive }) => (
  <Link to={to} className={`flex items-center block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`} onClick={onClick}>
    {icon}
    <span className="ml-2">{text}</span>
  </Link>
)

export default Navbar