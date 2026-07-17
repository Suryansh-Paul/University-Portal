import toast from "react-hot-toast";
import { CheckCircle2, XCircle, Info } from "lucide-react";

const baseStyle = {
  background: "#1F2937",
  color: "#F9FAFB",
  border: "1px solid #374151",
  borderRadius: "10px",
  padding: "12px 16px",
  fontSize: "14px",
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
};

export const showSuccess = (message) =>
  toast.success(message, {
    style: baseStyle,
    icon: <CheckCircle2 className="h-5 w-5 text-success" />,
  });

export const showError = (message) =>
  toast.error(message, {
    style: baseStyle,
    icon: <XCircle className="h-5 w-5 text-danger" />,
  });

export const showInfo = (message) =>
  toast(message, {
    style: baseStyle,
    icon: <Info className="h-5 w-5 text-primary" />,
  });
