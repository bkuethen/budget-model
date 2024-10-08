import React, { useState } from 'react'
import { Save } from 'lucide-react'

const Settings: React.FC = () => {
  const [companyName, setCompanyName] = useState('ACME Corporation')
  const [fiscalYearStart, setFiscalYearStart] = useState('01-01')
  const [currency, setCurrency] = useState('USD')
  const [timeZone, setTimeZone] = useState('UTC')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement settings update logic
    console.log('Settings updated:', { companyName, fiscalYearStart, currency, timeZone })
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fiscalYearStart" className="block text-sm font-medium text-gray-700">Fiscal Year Start</label>
            <input
              type="date"
              id="fiscalYearStart"
              value={fiscalYearStart}
              onChange={(e) => setFiscalYearStart(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700">Currency</label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="JPY">JPY - Japanese Yen</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="timeZone" className="block text-sm font-medium text-gray-700">Time Zone</label>
            <select
              id="timeZone"
              value={timeZone}
              onChange={(e) => setTimeZone(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="UTC">UTC</option>
              <option value="America/New_York">America/New_York</option>
              <option value="Europe/London">Europe/London</option>
              <option value="Asia/Tokyo">Asia/Tokyo</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
            >
              <Save className="mr-2" />
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Settings