import React, { useState } from 'react'
import { Plus, Edit2, Trash2, Search } from 'lucide-react'
import Modal from '../components/Modal'

interface Division {
  id: number
  name: string
  code: string
  parentId: number | null
  active: boolean
}

const Divisions: React.FC = () => {
  const [divisions, setDivisions] = useState<Division[]>([
    { id: 1, name: 'Sales', code: 'SAL', parentId: null, active: true },
    { id: 2, name: 'Marketing', code: 'MKT', parentId: null, active: true },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentDivision, setCurrentDivision] = useState<Division | null>(null)
  const [showInactive, setShowInactive] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const handleOpenModal = (division: Division | null = null) => {
    setCurrentDivision(division)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setCurrentDivision(null)
    setIsModalOpen(false)
  }

  const handleSave = (division: Division) => {
    if (division.id) {
      setDivisions(divisions.map(d => d.id === division.id ? division : d))
    } else {
      setDivisions([...divisions, { ...division, id: divisions.length + 1 }])
    }
    handleCloseModal()
  }

  const handleDelete = (id: number) => {
    setDivisions(divisions.filter(d => d.id !== id))
  }

  const handleToggleActive = (id: number) => {
    setDivisions(divisions.map(d => d.id === id ? { ...d, active: !d.active } : d))
  }

  const filteredDivisions = divisions.filter(d => 
    (showInactive || d.active) &&
    (d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     d.code.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search divisions..."
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
          Add Division
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Code</th>
            <th className="py-2 px-4 border-b text-left">Parent Division</th>
            <th className="py-2 px-4 border-b text-left">Active</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDivisions.map((division) => (
            <tr key={division.id} className="hover:bg-gray-100 cursor-pointer" onClick={() => handleOpenModal(division)}>
              <td className="py-2 px-4 border-b">{division.name}</td>
              <td className="py-2 px-4 border-b">{division.code}</td>
              <td className="py-2 px-4 border-b">
                {division.parentId ? divisions.find(d => d.id === division.parentId)?.name : 'N/A'}
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="checkbox"
                  checked={division.active}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleToggleActive(division.id);
                  }}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal(division);
                  }}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  <Edit2 className="inline-block" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(division.id);
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
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={currentDivision ? 'Edit Division' : 'Add Division'}>
        <DivisionForm division={currentDivision} onSave={handleSave} onCancel={handleCloseModal} divisions={divisions} />
      </Modal>
    </div>
  )
}

interface DivisionFormProps {
  division: Division | null
  onSave: (division: Division) => void
  onCancel: () => void
  divisions: Division[]
}

const DivisionForm: React.FC<DivisionFormProps> = ({ division, onSave, onCancel, divisions }) => {
  const [formData, setFormData] = useState<Division>(
    division || { id: 0, name: '', code: '', parentId: null, active: true }
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
               name === 'parentId' ? (value === '' ? null : Number(value)) : value
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
        <label htmlFor="code" className="block text-sm font-medium text-gray-700">Code</label>
        <input
          type="text"
          id="code"
          name="code"
          value={formData.code}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="parentId" className="block text-sm font-medium text-gray-700">Parent Division</label>
        <select
          id="parentId"
          name="parentId"
          value={formData.parentId === null ? '' : formData.parentId}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">No Parent</option>
          {divisions.filter(d => d.id !== formData.id).map(d => (
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

export default Divisions