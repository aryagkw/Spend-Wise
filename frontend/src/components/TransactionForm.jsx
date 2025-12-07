import React, { useState } from 'react';
import { createTransaction } from '../services/api';
import { Plus } from 'lucide-react';

const TransactionForm = ({ onTransactionAdded }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('EXPENSE');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createTransaction({ description, amount, type, date });
            setDescription('');
            setAmount('');
            setDate(new Date().toISOString().split('T')[0]);
            onTransactionAdded();
        } catch (error) {
            console.error("Error adding transaction", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card mb-6">
            <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Add Transaction</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input-field"
                        placeholder="e.g. Grocery Shopping"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="input-field"
                        placeholder="0.00"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Type</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="input-field"
                    >
                        <option value="EXPENSE">Expense</option>
                        <option value="INCOME">Income</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="input-field"
                        required
                    />
                </div>
            </div>
            <button
                type="submit"
                disabled={loading}
                className="mt-4 w-full btn-primary flex items-center justify-center gap-2"
            >
                <Plus size={20} />
                {loading ? 'Adding...' : 'Add Transaction'}
            </button>
        </form>
    );
};

export default TransactionForm;
