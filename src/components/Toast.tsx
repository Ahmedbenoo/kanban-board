import { useEffect} from "react";

type Props = {
  message: string;
  show: boolean;
  onClose: () => void;
};

function Toast({ message, show, onClose }: Props) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div
      className="position-fixed bottom-0 end-0 p-3"
      style={{ zIndex: 9999 }}
    >
      <div className="toast show bg-success text-white">
        <div className="toast-body">{message}</div>
      </div>
    </div>
  );
}

export default Toast;