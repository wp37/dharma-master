import { showToast } from '../components/Toast';

export async function safeCallAI<T>(
  fn: () => Promise<T>,
  setLoading?: (v: boolean) => void
): Promise<T | null> {
  try {
    setLoading?.(true);
    return await fn();
  } catch (e: any) {
    const msg = e?.message || 'Lỗi không xác định';
    if (msg.includes('429') || msg.toLowerCase().includes('quota')) {
      showToast('🚫 Hết quota API. Đợi 1 phút hoặc thêm key khác.', 'error');
    } else if (msg.includes('401') || msg.includes('403') || msg.toLowerCase().includes('api key')) {
      showToast('🔑 Sai/hết hạn API key. Mở Config để kiểm tra.', 'error');
    } else if (msg.toLowerCase().includes('json')) {
      showToast('🤖 AI trả response sai format. Thử lại 1 lần.', 'error');
    } else {
      showToast(`❌ ${msg}`, 'error');
    }
    return null;
  } finally {
    setLoading?.(false);
  }
}
