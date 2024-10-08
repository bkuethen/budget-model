import React, { useState } from 'react'
import { Plus, Edit2, Trash2, Search } from 'lucide-react'
import Modal from '../components/Modal'

interface Customer {
  id: number
  name: string
  company: string
  email: string
  phone: string
  active: boolean
}

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    { id: 1, name: 'Alice Johnson', company: 'Tech Corp', email: 'alice@techcorp.com', phone: '123-456-7890', active: true },
    { id: 2, name: 'Bob Williams', company: 'Innovate Inc', email: 'bob@innovate.com', phone: '987-654-3210', active: true },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null)
  const [showInactive, setShowInactive] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const handleOpenModal = (customer: Customer | null = null) => {
    setCurrentCustomer(customer)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setCurrentCustomer(null)
    setIsModalOpen(false)
  }

  const handleSave = (customer: Customer) => {
    if (customer.id) {
      setCustomers(customers.map(c => c.id === customer.id ? customer : c))
    } else {
      setCustomers([...customers, { ...customer, id: customers.length + 1 }])
    }
    handleCloseModal()
  }

  const handleDelete = (id: number) => {
    setCustomers(customers.filter(c => c.id !== id))
  }

  const handleToggleActive = (id: number) => {
    setCustomers(customers.map(c => c.id === id ? { ...c, active: !c.active } : c))
  }

  const filteredCustomers = customers.filter(c => 
    (showInactive || c.active) &&
    (c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
     c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
     c.phone.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search customers..."
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
          Add Customer
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Company</th>
            <th className="py-2 px-4 border-b text-left">Email</th>
            <th className="py-2 px-4 border-b text-left">Phone</th>
            <th className="py-2 px-4 border-b text-left">Active</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.id} className="hover:bg-gray-100 cursor-pointer" onClick={() => handleOpenModal(customer)}>
              <td className="py-2 px-4 border-b">{customer.name}</td>
              <td className="py-2 px-4 border-b">{customer.company}</td>
              <td className="py-2 px-4 border-b">{customer.email}</td>
              <td className="py-2 px-4 border-b">{customer.phone}</td>
              <td className="py-2 px-4 border-b">
                <input
                  type="checkbox"
                  checked={customer.active}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleToggleActive(customer.id);
                  }}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal(customer);
                  }}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  <Edit2 className="inline-block" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(customer.id);
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
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={currentCustomer ? 'Edit Customer' : 'Add Customer'}>
        <CustomerForm customer={currentCustomer} onSave={handleSave} onCancel={handleCloseModal} />
      </Modal>
    </div>
  )
}

interface CustomerFormProps {
  customer: Customer | null
  onSave: (customer: Customer) => void
  onCancel: () => void
}

const CustomerForm: React.FC<CustomerFormProps> = ({ customer, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Customer>(
    customer || { id: 0, name: '', company: '', email: '', phone: '', active: true }
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
        <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
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
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
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

export default Customers