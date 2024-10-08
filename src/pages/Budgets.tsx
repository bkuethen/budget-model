import React, { useState, useEffect } from 'react'
import { Plus, Trash2, Copy } from 'lucide-react'
import Modal from '../components/Modal'
import { Link } from 'react-router-dom'

interface Budget {
  id: number
  name: string
  startDate: string
  endDate: string
  status: 'Active' | 'Draft' | 'Archived'
}

const Budgets: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentBudget, setCurrentBudget] = useState<Budget | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBudgets()
  }, [])

  const fetchBudgets = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch('http://localhost:3001/api/budgets')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setBudgets(data)
    } catch (error) {
      console.error('Error fetching budgets:', error)
      setError('Failed to fetch budgets. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  // ... (rest of the component code remains the same)

  if (isLoading) {
    return <div className="text-center mt-8">Loading budgets...</div>
  }

  if (error) {
    return (
      <div className="text-center mt-8">
        <p className="text-red-500">{error}</p>
        <button
          onClick={fetchBudgets}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    )
  }

  // ... (rest of the component code remains the same)
}

export default Budgets