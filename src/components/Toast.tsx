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

  const dismiss = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const getStyle = (type: ToastType) => {
    if (type === 'error') return 'bg-red-500/[0.08] border-red-500/20 text-red-300';
    if (type === 'success') return 'bg-green-500/[0.08] border-green-500/20 text-green-300';
    return 'bg-[#D4A574]/[0.08] border-[#D4A574]/20 text-[#ECE6D8]/80';
  };

  const getIcon = (type: ToastType) => {
    if (type === 'error') return 'fa-solid fa-circle-xmark text-red-400';
    if (type === 'success') return 'fa-solid fa-circle-check text-green-400';
    return 'fa-solid fa-circle-info text-[#D4A574]';
  };

  return (
    <div className="fixed top-20 right-4 md:right-6 z-[300] space-y-2 max-w-sm">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`${getStyle(toast.type)} border rounded-xl p-3.5 shadow-[0_8px_40px_rgba(0,0,0,0.4)] backdrop-blur-2xl flex items-start gap-2.5 cursor-pointer`}
            onClick={() => dismiss(toast.id)}>
            <i className={`${getIcon(toast.type)} text-sm mt-0.5 shrink-0`}></i>
            <p className="text-xs font-medium leading-relaxed flex-1">{toast.message}</p>
            <button onClick={(e) => { e.stopPropagation(); dismiss(toast.id); }}
              className="text-current opacity-30 hover:opacity-70 transition-opacity duration-300 shrink-0">
              <i className="fa-solid fa-xmark text-xs"></i>
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;