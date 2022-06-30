import { toast } from "react-toastify"

type NotifyProps = {
  message: string
  type?: "success" | "error" | "warning" | "info"
}

export const notify = ({ message, type }: NotifyProps) => {
  switch (type) {
    case "success":
      toast.success(message, { autoClose: 3000 })
      break
    case "error":
      toast.error(message, { autoClose: 3000 })
      break
    case "warning":
      toast.warning(message, { autoClose: 3000 })
      break
    case "info":
      toast.info(message, { autoClose: 3000 })
      break
    default:
      toast(message, { autoClose: 3000 })
      break
  }
}
