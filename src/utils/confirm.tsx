import { createApp, ref } from "vue";
import { AnimatePresence, motion } from "motion-v";

export interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function confirm(options: ConfirmOptions): void {
  const confirmHideFlag = ref(false);
  const defaultOptions = {
    title: "确认",
    confirmText: "确定",
    cancelText: "取消",
    onConfirm: () => {},
    onCancel: () => {},
    ...options,
  };

  const handleConfirm = () => {
    confirmHideFlag.value = true;
    defaultOptions.onConfirm?.();
    setTimeout(() => {
      confirmApp.unmount();
      document.body.removeChild(confirmContainer);
    }, 300); // 动画结束后移除
  };

  const handleCancel = () => {
    confirmHideFlag.value = true;
    defaultOptions.onCancel?.();
    setTimeout(() => {
      confirmApp.unmount();
      document.body.removeChild(confirmContainer);
    }, 300); // 动画结束后移除
  };

  const confirmInstance = () => (
    <AnimatePresence>
      {confirmHideFlag.value ? null : (
        <div class="fixed inset-0 flex items-center justify-center z-50 bg-[#00000050]">
          <motion.div
            class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 px-2"
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            exit={{ opacity: 0, scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.95 }}
          >
            {defaultOptions.title && (
              <div class="px-6 py-4 border-b border-gray-200">
                <h3 class="text-lg font-medium text-gray-900">
                  {defaultOptions.title}
                </h3>
              </div>
            )}
            <div class="px-6 py-4">
              <p class="text-gray-700">{defaultOptions.message}</p>
            </div>
            <div class="px-6 py-3 flex justify-end space-x-3">
              {defaultOptions.cancelText && (
                <button
                  onClick={handleCancel}
                  class="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  {defaultOptions.cancelText}
                </button>
              )}
              {defaultOptions.confirmText && (
                <button
                  onClick={handleConfirm}
                  class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  {defaultOptions.confirmText}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  const confirmContainer = document.createElement("div");
  document.body.appendChild(confirmContainer);

  const confirmApp = createApp(confirmInstance);
  confirmApp.mount(confirmContainer);
}
