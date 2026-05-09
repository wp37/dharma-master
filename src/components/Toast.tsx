import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type ToastType = 'error' | 'success' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

let toastId = 0;
let addToastFn: ((message: string, type: ToastType) => void) | null = null;

export const showToast = (message: string, type: ToastType = 'info') => {
  addToastFn?.(message, type);
};

const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    addToastFn = (message: string, type: ToastType) => {
      const id = ++toastId;
      setToasts(prev => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 5000);
    };
    return () => { addToastFn = null; };
  }, []);

  const getStyle = (type: ToastType) => {
    if (type === 'error') return 'bg-red-950/95 border-red-500/50 text-red-200';
    if (type === 'success') return 'bg-green-950/95 border-green-500/50 text-green-200';
    return 'bg-[#2C2419]/95 border-amber-600/50 text-amber-200';
  };

  return (
    <div className="fixed top-20 right-6 z-[300] space-y-2">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div key={toast.id} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}
            className={`${getStyle(toast.type)} border rounded-xl p-4 shadow-2xl max-w-sm backdrop-blur-md`}>
            <p className="text-xs">{toast.message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;