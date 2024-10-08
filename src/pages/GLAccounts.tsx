import React, { useState } from 'react'
import { Plus, Edit2, Trash2, Search } from 'lucide-react'
import Modal from '../components/Modal'

interface GLAccount {
  id: number
  code: string
  name: string
  type: string
  active: boolean
}

const GLAccounts: React.FC = () => {
  const [accounts, setAccounts] = useState<GLAccount[]>([
    { id: 1, code: '1000', name: 'Cash', type: 'Asset', active: true },
    { id: 2, code: '2000', name: 'Accounts Payable', type: 'Liability', active: true },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentAccount, setCurrentAccount] = useState<GLAccount | null>(null)
  const [showInactive, setShowInactive] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const handleOpenModal = (account: GLAccount | null = null) => {
    setCurrentAccount(account)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setCurrentAccount(null)
    setIsModalOpen(false)
  }

  const handleSave = (account: GLAccount) => {
    if (account.id) {
      setAccounts(accounts.map(a => a.id === account.id ? account : a))
    } else {
      setAccounts([...accounts, { ...account, id: accounts.length + 1 }])
    }
    handleCloseModal()
  }

  const handleDelete = (id: number) => {
    setAccounts(accounts.filter(a => a.id !== id))
  }

  const handleToggleActive = (id: number) => {
    setAccounts(accounts.map(a => a.id === id ? { ...a, active: !a.active } : a))
  }

  const filteredAccounts = accounts.filter(a => 
    (showInactive || a.active) &&
    (a.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
     a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     a.type.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search GL accounts..."
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
          Add GL Account
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Code</th>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Type</th>
            <th className="py-2 px-4 border-b text-left">Active</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAccounts.map((account) => (
            <tr key={account.id} className="hover:bg-gray-100 cursor-pointer" onClick={() => handleOpenModal(account)}>
              <td className="py-2 px-4 border-b">{account.code}</td>
              <td className="py-2 px-4 border-b">{account.name}</td>
              <td className="py-2 px-4 border-b">{account.type}</td>
              <td className="py-2 px-4 border-b">
                <input
                  type="checkbox"
                  checked={account.active}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleToggleActive(account.id);
                  }}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal(account);
                  }}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  <Edit2 className="inline-block" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(account.id);
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
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={currentAccount ? 'Edit GL Account' : 'Add GL Account'}>
        <GLAccountForm account={currentAccount} onSave={handleSave} onCancel={handleCloseModal} />
      </Modal>
    </div>
  )
}

interface GLAccountFormProps {
  account: GLAccount | null
  onSave: (account: GLAccount) => void
  onCancel: () => void
}

const GLAccountForm: React.FC<GLAccountFormProps> = ({ account, onSave, onCancel }) => {
  const [formData, setFormData] = useState<GLAccount>(
    account || { id: 0, code: '', name: '', type: '', active: true }
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="code" className="block text-sm font-medium text-gray-700">Code</label>
        <input
          type="text"
          id="code"
          name="code"
          value={formData.code}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
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
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="">Select a type</option>
          <option value="Asset">Asset</option>
          <option value="Liability">Liability</option>
          <option value="Equity">Equity</option>
          <option value="Revenue">Revenue</option>
          <option value="Expense">Expense</option>
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

export default GLAccounts