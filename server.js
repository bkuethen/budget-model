import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Mock data
let budgets = [
  { id: 1, name: 'FY 2024 Budget', startDate: '2024-01-01', endDate: '2024-12-31', status: 'Active' },
  { id: 2, name: 'Q1 2024 Forecast', startDate: '2024-01-01', endDate: '2024-03-31', status: 'Draft' },
];

// Budgets API
app.get('/api/budgets', (req, res) => {
  res.json(budgets);
});

app.get('/api/budgets/:id', (req, res) => {
  const budget = budgets.find(b => b.id === parseInt(req.params.id));
  if (budget) {
    res.json(budget);
  } else {
    res.status(404).json({ message: 'Budget not found' });
  }
});

app.post('/api/budgets', (req, res) => {
  const newBudget = { id: budgets.length + 1, ...req.body };
  budgets.push(newBudget);
  res.status(201).json(newBudget);
});

app.put('/api/budgets/:id', (req, res) => {
  const index = budgets.findIndex(b => b.id === parseInt(req.params.id));
  if (index !== -1) {
    budgets[index] = { ...budgets[index], ...req.body };
    res.json(budgets[index]);
  } else {
    res.status(404).json({ message: 'Budget not found' });
  }
});

app.delete('/api/budgets/:id', (req, res) => {
  budgets = budgets.filter(b => b.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});