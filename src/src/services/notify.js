import { toast } from 'react-toastify';

const notify = {
  info: (message) => toast.info(message),
  success: (message) => toast.success(message),
  warning: (message) => toast.warning(message),
  error: (message) => toast.error(message),
  default: (message) => toast(message)
};

export default notify;
