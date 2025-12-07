import React, { useEffect, useState } from 'react';
import TransactionList from './TransactionList';
import TransactionForm from './TransactionForm';
import SavingsGoalCard from './SavingsGoalCard';
import SavingsGoalForm from './SavingsGoalForm';
import { getTransactions, getGoals } from '../services/api';
import { Wallet, PieChart, TrendingUp, DollarSign } from 'lucide-react';

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const [transactionsRes, goalsRes] = await Promise.all([
                getTransactions(),
                getGoals()
            ]);
            setTransactions(transactionsRes.data);
            setGoals(goalsRes.data);
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const calculateBalance = () => {
        return transactions.reduce((acc, t) => {
            return t.type === 'INCOME' ? acc + t.amount : acc - t.amount;
        }, 0);
    };

    const calculateIncome = () => {
        return transactions
            .filter(t => t.type === 'INCOME')
            .reduce((acc, t) => acc + t.amount, 0);
    };

    const calculateExpenses = () => {
        return transactions
            .filter(t => t.type === 'EXPENSE')
            .reduce((acc, t) => acc + t.amount, 0);
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Dashboard</h1>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                    Welcome back!
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="card border-l-4 border-indigo-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm uppercase font-semibold">Total Balance</p>
                            <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">${calculateBalance().toFixed(2)}</p>
                        </div>
                        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full text-indigo-600 dark:text-indigo-400">
                            <Wallet size={24} />
                        </div>
                    </div>
                </div>

                <div className="card border-l-4 border-emerald-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm uppercase font-semibold">Total Income</p>
                            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">+${calculateIncome().toFixed(2)}</p>
                        </div>
                        <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400">
                            <TrendingUp size={24} />
                        </div>
                    </div>
                </div>

                <div className="card border-l-4 border-red-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm uppercase font-semibold">Total Expenses</p>
                            <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">-${calculateExpenses().toFixed(2)}</p>
                        </div>
                        <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full text-red-600 dark:text-red-400">
                            <DollarSign size={24} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Transactions Section */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                        <PieChart size={24} className="text-indigo-600 dark:text-indigo-400" />
                        Recent Transactions
                    </h2>
                    <TransactionForm onTransactionAdded={fetchData} />
                    <TransactionList transactions={transactions} onTransactionDeleted={fetchData} />
                </div>

                {/* Savings Goals Section */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                        <Wallet size={24} className="text-purple-600 dark:text-purple-400" />
                        Savings Goals
                    </h2>
                    <SavingsGoalForm onGoalAdded={fetchData} />
                    <div className="space-y-4">
                        {goals.length > 0 ? (
                            goals.map(goal => (
                                <SavingsGoalCard key={goal.id} goal={goal} onGoalDeleted={fetchData} />
                            ))
                        ) : (
                            <div className="text-center py-8 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
                                <p className="text-slate-500 dark:text-slate-400">No savings goals yet. Create one to start saving!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
