import React from 'react';
import { deleteGoal } from '../services/api';
import { Trash2, Calendar, Target } from 'lucide-react';

const SavingsGoalCard = ({ goal, onGoalDeleted }) => {
    const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);

    const handleDelete = async () => {
        if (window.confirm("Delete this savings goal?")) {
            try {
                await deleteGoal(goal.id);
                onGoalDeleted();
            } catch (error) {
                console.error("Error deleting goal", error);
            }
        }
    };

    return (
        <div className="card relative group hover:shadow-xl transition-all">
            <button
                onClick={handleDelete}
                className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                title="Delete Goal"
            >
                <Trash2 size={18} />
            </button>

            <div className="flex items-start justify-between mb-4">
                <h4 className="text-lg font-bold text-slate-800 dark:text-white pr-8">{goal.name}</h4>
                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-lg">
                    {progress.toFixed(0)}%
                </span>
            </div>

            <div className="flex justify-between items-end mb-2">
                <div className="text-sm text-slate-600 dark:text-slate-300">
                    <span className="font-semibold text-slate-900 dark:text-white text-lg">${goal.currentAmount}</span>
                    <span className="text-slate-400 mx-1">/</span>
                    ${goal.targetAmount}
                </div>
            </div>

            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 mb-4 overflow-hidden">
                <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg inline-block w-full">
                <Calendar size={14} />
                <span>Target: {goal.deadline}</span>
            </div>
        </div>
    );
};

export default SavingsGoalCard;
