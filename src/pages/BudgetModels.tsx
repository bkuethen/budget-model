import React, { useState } from 'react'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import Modal from '../components/Modal'

interface BudgetModel {
  id: number
  name: string
  startDate: string
  endDate: string
  status: 'Active' | 'Draft' | 'Archived'
}

const BudgetModels: React.FC = () => {
  const [models, setModels] = useState<BudgetModel[]>([
    { id: 1, name: 'FY 2024 Budget', startDate: '2024-01-01', endDate: '2024-12-31', status: 'Active' },
    { id: 2, name: 'Q1 2024 Forecast', startDate: '2024-01-01', endDate: '2024-03-31', status: 'Draft' },
    { id: 3, name: 'FY 2023 Budget', startDate: '2023-01-01', endDate: '2023-12-31', status: 'Archived' },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentModel, setCurrentModel] = useState<BudgetModel | null>(null)

  const handleOpenModal = (model: BudgetModel | null = null) => {
    setCurrentModel(model)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setCurrentModel(null)
    setIsModalOpen(false)
  }

  const handleSave = (model: BudgetModel) => {
    if (model.id) {
      setModels(models.map(m => m.id === model.id ? model : m))
    } else {
      setModels([...models, { ...model, id: models.length + 1 }])
    }
    handleCloseModal()
  }

  const handleDelete = (id: number) => {
    setModels(models.filter(m => m.id !== id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Budget Models</h1>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
          onClick={() => handleOpenModal()}
        >
          <Plus className="mr-2" />
          Create Model
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {models.map((model) => (
              <tr key={model.id}>
                <td className="px-6 py-4 whitespace-nowrap">{model.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{model.startDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{model.endDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    model.status === 'Active' ? 'bg-green-100 text-green-800' :
                    model.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {model.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-4" onClick={() => handleOpenModal(model)}>
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-900" onClick={() => handleDelete(model.id)}>
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={currentModel ? 'Edit Budget Model' : 'Create Budget Model'}>
        <BudgetModelForm model={currentModel} onSave={handleSave} onCancel={handleCloseModal} />
      </Modal>
    </div>
  )
}

interface BudgetModelFormProps {
  model: BudgetModel | null
  onSave: (model: BudgetModel) => void
  onCancel: () => void
}

const BudgetModelForm: React.FC<BudgetModelFormProps> = ({ model, onSave, onCancel }) => {
  const [formData, setFormData] = useState<BudgetModel>(
    model || { id: 0, name: '', startDate: '', endDate: '', status: 'Draft' }
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
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
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="Active">Active</option>
          <option value="Draft">Draft</option>
          <option value="Archived">Archived</option>
        </select>
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

export default BudgetModels