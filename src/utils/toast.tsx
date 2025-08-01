import { createApp, ref } from "vue";
import { AnimatePresence, motion } from "motion-v";

export interface ToastOptions {
  message: string;
  duration?: number;
}

export function toast(options: ToastOptions): void {
  const toastHideFlag = ref(false);

  const toastInstance = () => (
    <AnimatePresence>
      {toastHideFlag.value ? null : (
        <motion.div
          class="toast toast-top toast-end bg-transparent"
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
        >
          <div class="alert">
            <span>{options.message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const toastContainer = document.createElement("div");
  document.body.appendChild(toastContainer);

  const toastApp = createApp(toastInstance);
  toastApp.mount(toastContainer);

  setTimeout(
    () => {
      toastHideFlag.value = true;
    },
    (options.duration || 3000) + 250, // 250ms for start animation
  );

  setTimeout(
    () => {
      toastApp.unmount();
      document.body.removeChild(toastContainer);
    },
    (options.duration || 3000) + 500, // 500ms for end animation
  );
}
