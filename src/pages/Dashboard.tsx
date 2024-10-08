import React from 'react'
import { BarChart3, DollarSign, Users, Briefcase } from 'lucide-react'

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Budget"
          value="$1,234,567"
          icon={<DollarSign className="h-8 w-8 text-green-500" />}
        />
        <DashboardCard
          title="Active Models"
          value="5"
          icon={<BarChart3 className="h-8 w-8 text-blue-500" />}
        />
        <DashboardCard
          title="Employees"
          value="50"
          icon={<Users className="h-8 w-8 text-purple-500" />}
        />
        <DashboardCard
          title="Divisions"
          value="3"
          icon={<Briefcase className="h-8 w-8 text-orange-500" />}
        />
      </div>
    </div>
  )
}

const DashboardCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      {icon}
    </div>
    <p className="text-3xl font-bold text-gray-800">{value}</p>
  </div>
)

export default Dashboard