import React, { useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import Employees from './Employees'
import Customers from './Customers'
import Vendors from './Vendors'
import GLAccounts from './GLAccounts'
import Divisions from './Divisions'

const Entities: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(() => {
    const path = location.pathname.split('/').pop()
    return path || "employees"
  })

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    navigate(`/entities/${value}`)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Entities</h1>
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-4">
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="glaccounts">GL Accounts</TabsTrigger>
          <TabsTrigger value="divisions">Divisions</TabsTrigger>
        </TabsList>
        <Routes>
          <Route path="/" element={<Employees />} />
          <Route path="employees" element={<Employees />} />
          <Route path="customers" element={<Customers />} />
          <Route path="vendors" element={<Vendors />} />
          <Route path="glaccounts" element={<GLAccounts />} />
          <Route path="divisions" element={<Divisions />} />
        </Routes>
      </Tabs>
    </div>
  )
}

export default Entities