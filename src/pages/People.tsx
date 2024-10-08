import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import Employees from './Employees'
import Customers from './Customers'
import Vendors from './Vendors'

const People: React.FC = () => {
  const [activeTab, setActiveTab] = useState("employees")

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">People</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
        </TabsList>
        <TabsContent value="employees">
          <Employees />
        </TabsContent>
        <TabsContent value="customers">
          <Customers />
        </TabsContent>
        <TabsContent value="vendors">
          <Vendors />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default People