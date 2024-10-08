import React, { useState } from 'react'
import { Plus, Edit2, Trash2, Search } from 'lucide-react'
import Modal from '../components/Modal'

interface Vendor {
  id: number
  name: string
  category: string
  contact: string
  email: string
  active: boolean
}

const Vendors: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>([
    { id: 1, name: 'Office Supplies Co', category: 'Office Supplies', contact: 'Sarah Brown', email: 'sarah@officesupplies.com', active: true },
    { id: 2, name: 'Tech Solutions Inc', category: 'IT Services', contact: 'Mike Johnson', email: 'mike@techsolutions.com', active: true },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentVendor, setCurrentVendor] = useState<Vendor | null>(null)
  const [showInactive, setShowInactive] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const handleOpenModal = (vendor: Vendor | null = null) => {
    setCurrentVendor(vendor)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setCurrentVendor(null)
    setIsModalOpen(false)
  }

  const handleSave = (vendor: Vendor) => {
    if (vendor.id) {
      setVendors(vendors.map(v => v.id === vendor.id ? vendor : v))
    } else {
      setVendors([...vendors, { ...vendor, id: vendors.length + 1 }])
    }
    handleCloseModal()
  }

  const handleDelete = (id: number) => {
    setVendors(vendors.filter(v => v.id !== id))
  }

  const handleToggleActive = (id: number) => {
    setVendors(vendors.map(v => v.id === id ? { ...v, active: !v.active } : v))
  }

  const filteredVendors = vendors.filter(v => 
    (showInactive || v.active) &&
    (v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     v.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
     v.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
     v.email.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search vendors..."
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
          Add Vendor
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Category</th>
            <th className="py-2 px-4 border-b text-left">Contact</th>
            <th className="py-2 px-4 border-b text-left">Email</th>
            <th className="py-2 px-4 border-b text-left">Active</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredVendors.map((vendor) => (
            <tr key={vendor.id} className="hover:bg-gray-100 cursor-pointer" onClick={() => handleOpenModal(vendor)}>
              <td className="py-2 px-4 border-b">{vendor.name}</td>
              <td className="py-2 px-4 border-b">{vendor.category}</td>
              <td className="py-2 px-4 border-b">{vendor.contact}</td>
              <td className="py-2 px-4 border-b">{vendor.email}</td>
              <td className="py-2 px-4 border-b">
                <input
                  type="checkbox"
                  checked={vendor.active}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleToggleActive(vendor.id);
                  }}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal(vendor);
                  }}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  <Edit2 className="inline-block" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(vendor.id);
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
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={currentVendor ? 'Edit Vendor' : 'Add Vendor'}>
        <VendorForm vendor={currentVendor} onSave={handleSave} onCancel={handleCloseModal} />
      </Modal>
    </div>
  )
}

interface VendorFormProps {
  vendor: Vendor | null
  onSave: (vendor: Vendor) => void
  onCancel: () => void
}

const VendorForm: React.FC<VendorFormProps> = ({ vendor, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Vendor>(
    vendor || { id: 0, name: '', category: '', contact: '', email: '', active: true }
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
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact</label>
        <input
          type="text"
          id="contact"
          name="contact"
          value={formData.contact}
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

export default Vendors