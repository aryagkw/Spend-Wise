import React, { useState } from 'react';
import { createGoal } from '../services/api';
import { Plus } from 'lucide-react';

const SavingsGoalForm = ({ onGoalAdded }) => {
    const [name, setName] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [currentAmount, setCurrentAmount] = useState('0');
    const [deadline, setDeadline] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createGoal({ name, targetAmount, currentAmount, deadline });
            setName('');
            setTargetAmount('');
            setCurrentAmount('0');
            setDeadline('');
            onGoalAdded();
        } catch (error) {
            console.error("Error adding goal", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card mb-6">
            <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Add Savings Goal</h3>
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Goal Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input-field"
                        placeholder="e.g. New Laptop"
                        required
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Target</label>
                        <input
                            type="number"
                            value={targetAmount}
                            onChange={(e) => setTargetAmount(e.target.value)}
                            className="input-field"
                            placeholder="1000"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Saved</label>
                        <input
                            type="number"
                            value={currentAmount}
                            onChange={(e) => setCurrentAmount(e.target.value)}
                            className="input-field"
                            placeholder="0"
                            required
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Deadline</label>
                    <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
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
                {loading ? 'Adding...' : 'Add Goal'}
            </button>
        </form>
    );
};

export default SavingsGoalForm;
