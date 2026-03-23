'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Lock, Eye, EyeOff, LogIn, ArrowRight } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { cn } from '@/src/lib/utils';
import { useAppDispatch } from '@/src/hook/hooks';
import { loginThunk } from '@/src/hook/auth/authThunks';

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const dispatch = useAppDispatch();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await dispatch(loginThunk({ userName, password })).unwrap()
            console.log("is response", response);
            if (response.status === 200) {
                toast.success('Successfully logged in!', {
                    description: `Welcome back, ${response.user.userName}`,
                });
                setIsLoading(false);
                 router.push('/');
            } else {
                toast.error('Login failed', {
                    description: 'Unknown error occurred',
                });
                setIsLoading(false);
            }
        } catch (error: any) {
            toast.error('Authentication Error', {
                description: error.message || 'Invalid credentials',
            });
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-76px)] flex items-center justify-center p-6 bg-app-bg">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-[2rem] shadow-sh-xl border border-border-light overflow-hidden transition-all duration-300 hover:shadow-sh-lg">
                    {/* Header Section */}
                    <div className="bg-linear-to-b from-primary/5 to-transparent p-10 pb-6 text-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="w-20 h-20 bg-white rounded-2xl shadow-sh-md mx-auto mb-6 flex items-center justify-center border border-border-light group cursor-pointer"
                        >
                            <LogIn className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-300" />
                        </motion.div>
                        <h1 className="text-3xl font-extrabold text-navy-md tracking-tight mb-2">Welcome Back</h1>
                        <p className="text-text-muted font-medium text-[15px]">Sign in to continue to Acadivate</p>
                    </div>

                    {/* Form Section */}
                    <form onSubmit={handleSubmit} className="p-10 pt-0 space-y-6">
                        <div className="space-y-4">
                            {/* UserName Input */}
                            <div className="space-y-2">
                                <label className="text-[13px] font-bold text-navy-md/70 uppercase tracking-widest pl-1">
                                    User Name
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-subtle group-focus-within:text-primary transition-colors">
                                        <User size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        className="w-full h-14 pl-12 pr-4 bg-bg-light border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-xl text-[15px] font-semibold text-navy outline-hidden transition-all placeholder:text-text-subtle/50"
                                        placeholder="Enter your username"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between pl-1">
                                    <label className="text-[13px] font-bold text-navy-md/70 uppercase tracking-widest">
                                        Password
                                    </label>
                                    <a href="#" className="text-[12px] font-bold text-primary hover:text-primary-dark transition-colors">
                                        Forgot?
                                    </a>
                                </div>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-subtle group-focus-within:text-primary transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full h-14 pl-12 pr-12 bg-bg-light border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-xl text-[15px] font-semibold text-navy outline-hidden transition-all placeholder:text-text-subtle/50"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-subtle hover:text-navy transition-colors outline-hidden"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 px-1">
                            <input
                                type="checkbox"
                                id="remember"
                                className="w-4 h-4 rounded border-border-2 text-primary focus:ring-primary/20"
                            />
                            <label htmlFor="remember" className="text-[14px] font-medium text-text-muted cursor-pointer select-none">
                                Remember me
                            </label>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full h-14 text-[16px] group"
                            disabled={isLoading}
                        >
                            <AnimatePresence mode="wait">
                                {isLoading ? (
                                    <motion.div
                                        key="loading"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Connecting...
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="sign-in"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center gap-2"
                                    >
                                        Sign In
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Button>
                    </form>

                    {/* Footer Section */}
                    <div className="px-10 py-6 bg-bg-light/50 border-t border-border-light text-center">
                        <p className="text-[14px] text-text-muted font-medium">
                            Don't have an account?{' '}
                            <a href="#" className="text-gold font-bold hover:underline transition-all">
                                Create account
                            </a>
                        </p>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8 text-center"
                >
                    <p className="text-[12px] font-bold text-text-subtle uppercase tracking-[3px]">
                        Acadivate Research & Innovation
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default LoginForm;