import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Calendar } from 'lucide-react';

const UserProfile = () => {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <div className="max-w-2xl mx-auto p-4 md:p-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-32 relative">
                    <div className="absolute -bottom-12 left-8">
                        <div className="h-24 w-24 rounded-full bg-white dark:bg-slate-800 p-2 shadow-lg">
                            <div className="h-full w-full rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                <User size={40} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-16 pb-8 px-8">
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">{user.username}</h1>
                    <p className="text-slate-500 dark:text-slate-400 mb-8">Personal Profile</p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                                <Mail size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Email Address</p>
                                <p className="text-lg font-semibold text-slate-800 dark:text-white">{user.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                                <Shield size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Role</p>
                                <p className="text-lg font-semibold text-slate-800 dark:text-white">
                                    {user.roles && user.roles.length > 0 ? user.roles[0].replace('ROLE_', '') : 'User'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                                <Calendar size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Member Since</p>
                                <p className="text-lg font-semibold text-slate-800 dark:text-white">December 2025</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
