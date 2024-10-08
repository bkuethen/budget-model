import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Search } from 'lucide-react'
import Modal from '../components/Modal'

interface Employee {
  id: number
  name: string
  position: string
  department: string
  email: string
  divisionId: number | null
  active: boolean
}

interface Division {
  id: number
  name: string
  code: string
  parentId: number | null
  active: boolean
}

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: 'John Doe', position: 'Developer', department: 'IT', email: 'john@example.com', divisionId: null, active: true },
    { id: 2, name: 'Jane Smith', position: 'Designer', department: 'Creative', email: 'jane@example.com', divisionId: null, active: true },
  ])
  const [divisions, setDivisions] = useState<Division[]>([
    { id: 1, name: 'Sales', code: 'SAL', parentId: null, active: true },
    { id: 2, name: 'Marketing', code: 'MKT', parentId: null, active: true },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null)
  const [showInactive, setShowInactive] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Fetch divisions from the Divisions component
  useEffect(() => {
    // In a real application, you would fetch this data from an API
    // For now, we'll use the mock data defined above
  }, [])

  const handleOpenModal = (employee: Employee | null = null) => {
    setCurrentEmployee(employee)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setCurrentEmployee(null)
    setIsModalOpen(false)
  }

  const handleSave = (employee: Employee) => {
    if (employee.id) {
      setEmployees(employees.map(e => e.id === employee.id ? employee : e))
    } else {
      setEmployees([...employees, { ...employee, id: employees.length + 1 }])
    }
    handleCloseModal()
  }

  const handleDelete = (id: number) => {
    setEmployees(employees.filter(e => e.id !== id))
  }

  const handleToggleActive = (id: number) => {
    setEmployees(employees.map(e => e.id === id ? { ...e, active: !e.active } : e))
  }

  const filteredEmployees = employees.filter(e => 
    (showInactive || e.active) &&
    (e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     e.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
     e.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
     e.email.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 mr-2"
          />
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showInactive}
              onChange={() => setShowInactive(!showInactive)}
              className="mr-2"
            />
            Show Inactive
          </label>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          <Plus className="inline-block mr-2" />
          Add Employee
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Position</th>
            <th className="py-2 px-4 border-b text-left">Department</th>
            <th className="py-2 px-4 border-b text-left">Email</th>
            <th className="py-2 px-4 border-b text-left">Division</th>
            <th className="py-2 px-4 border-b text-left">Active</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id} className="hover:bg-gray-100 cursor-pointer" onClick={() => handleOpenModal(employee)}>
              <td className="py-2 px-4 border-b">{employee.name}</td>
              <td className="py-2 px-4 border-b">{employee.position}</td>
              <td className="py-2 px-4 border-b">{employee.department}</td>
              <td className="py-2 px-4 border-b">{employee.email}</td>
              <td className="py-2 px-4 border-b">
                {divisions.find(d => d.id === employee.divisionId)?.name || 'N/A'}
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="checkbox"
                  checked={employee.active}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleToggleActive(employee.id);
                  }}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal(employee);
                  }}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  <Edit2 className="inline-block" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(employee.id);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="inline-block" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={currentEmployee ? 'Edit Employee' : 'Add Employee'}>
        <EmployeeForm employee={currentEmployee} onSave={handleSave} onCancel={handleCloseModal} divisions={divisions} />
      </Modal>
    </div>
  )
}

interface EmployeeFormProps {
  employee: Employee | null
  onSave: (employee: Employee) => void
  onCancel: () => void
  divisions: Division[]
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, onSave, onCancel, divisions }) => {
  const [formData, setFormData] = useState<Employee>(
    employee || { id: 0, name: '', position: '', department: '', email: '', divisionId: null, active: true }
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
               name === 'divisionId' ? (value === '' ? null : Number(value)) : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position</label>
        <input
          type="text"
          id="position"
          name="position"
          value={formData.position}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
        <input
          type="text"
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="divisionId" className="block text-sm font-medium text-gray-700">Division</label>
        <select
          id="divisionId"
          name="divisionId"
          value={formData.divisionId === null ? '' : formData.divisionId}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select a division</option>
          {divisions.filter(d => d.active).map(d => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="active"
            checked={formData.active}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-sm text-gray-700">Active</span>
        </label>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default Employees