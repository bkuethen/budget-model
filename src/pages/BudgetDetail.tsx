import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Trash2, Plus } from 'lucide-react'

interface Budget {
  id: number
  name: string
  startDate: string
  endDate: string
  status: 'Active' | 'Draft' | 'Archived'
}

interface BudgetEntry {
  id: number
  entityId: number
  glAccountId: number
  divisionId: number
  amount: number
  date: string
}

interface Entity {
  id: number
  name: string
}

interface GLAccount {
  id: number
  name: string
}

interface Division {
  id: number
  name: string
}

const BudgetDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [budget, setBudget] = useState<Budget | null>(null)
  const [entries, setEntries] = useState<BudgetEntry[]>([])
  const [entities, setEntities] = useState<Entity[]>([])
  const [glAccounts, setGLAccounts] = useState<GLAccount[]>([])
  const [divisions, setDivisions] = useState<Division[]>([])
  const [activeTab, setActiveTab] = useState("details")
  const [newEntriesCount, setNewEntriesCount] = useState(10)

  useEffect(() => {
    // Fetch budget details
    // This is a mock implementation. Replace with actual API call in a real application.
    setBudget({
      id: Number(id),
      name: `Budget ${id}`,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'Active'
    })

    // Fetch budget entries
    // This is a mock implementation. Replace with actual API call in a real application.
    setEntries([
      { id: 1, entityId: 1, glAccountId: 1, divisionId: 1, amount: 1000, date: '2024-01-15' },
      { id: 2, entityId: 2, glAccountId: 2, divisionId: 2, amount: 2000, date: '2024-02-15' },
    ])

    // Fetch entities, GL accounts, and divisions
    // This is a mock implementation. Replace with actual API calls in a real application.
    setEntities([
      { id: 1, name: 'Entity 1' },
      { id: 2, name: 'Entity 2' },
    ])
    setGLAccounts([
      { id: 1, name: 'Account 1' },
      { id: 2, name: 'Account 2' },
    ])
    setDivisions([
      { id: 1, name: 'Division 1' },
      { id: 2, name: 'Division 2' },
    ])
  }, [id])

  const handleDelete = () => {
    // Implement delete logic here
    console.log('Delete budget:', id)
  }

  const handleEntryChange = (entryId: number, field: string, value: string | number) => {
    setEntries(entries.map(entry => 
      entry.id === entryId ? { ...entry, [field]: value } : entry
    ))
  }

  const addNewEntries = () => {
    const lastId = entries.length > 0 ? entries[entries.length - 1].id : 0
    const newEntries = Array.from({ length: newEntriesCount }, (_, index) => ({
      id: lastId + index + 1,
      entityId: 0,
      glAccountId: 0,
      divisionId: 0,
      amount: 0,
      date: new Date().toISOString().split('T')[0]
    }))
    setEntries([...entries, ...newEntries])
  }

  if (!budget) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{budget.name}</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="entries">Entries</TabsTrigger>
          <TabsTrigger value="pivot">Pivot</TabsTrigger>
          <TabsTrigger value="views">Views</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <p className="mt-1 text-sm text-gray-900">{budget.name}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <p className="mt-1 text-sm text-gray-900">{budget.startDate}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <p className="mt-1 text-sm text-gray-900">{budget.endDate}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <p className="mt-1 text-sm text-gray-900">{budget.status}</p>
            </div>
            <button
              onClick={handleDelete}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center"
            >
              <Trash2 className="mr-2" />
              Delete Budget
            </button>
          </div>
        </TabsContent>

        <TabsContent value="entries">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entity</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GL Account</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Division</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {entries.map((entry) => (
                  <tr key={entry.id}>
                    <td>
                      <select
                        value={entry.entityId}
                        onChange={(e) => handleEntryChange(entry.id, 'entityId', parseInt(e.target.value))}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="">Select Entity</option>
                        {entities.map((entity) => (
                          <option key={entity.id} value={entity.id}>{entity.name}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        value={entry.glAccountId}
                        onChange={(e) => handleEntryChange(entry.id, 'glAccountId', parseInt(e.target.value))}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="">Select GL Account</option>
                        {glAccounts.map((account) => (
                          <option key={account.id} value={account.id}>{account.name}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        value={entry.divisionId}
                        onChange={(e) => handleEntryChange(entry.id, 'divisionId', parseInt(e.target.value))}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="">Select Division</option>
                        {divisions.map((division) => (
                          <option key={division.id} value={division.id}>{division.name}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        value={entry.amount}
                        onChange={(e) => handleEntryChange(entry.id, 'amount', parseFloat(e.target.value))}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        value={entry.date}
                        onChange={(e) => handleEntryChange(entry.id, 'date', e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center">
            <button
              onClick={addNewEntries}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center"
            >
              <Plus className="mr-2" />
              Add New Entries
            </button>
            <input
              type="number"
              value={newEntriesCount}
              onChange={(e) => setNewEntriesCount(parseInt(e.target.value))}
              className="ml-4 w-16 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              min="1"
            />
          </div>
        </TabsContent>

        <TabsContent value="pivot">
          <div>Pivot view coming soon...</div>
        </TabsContent>

        <TabsContent value="views">
          <div>Custom views coming soon...</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default BudgetDetail