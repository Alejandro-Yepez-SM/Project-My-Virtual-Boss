import { Check, Octagon } from "lucide-react";
import OutlineButton from "../button/OutlineButton";

type TwoConfirmationWidgetProps = {
  title: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
};

export const TwoConfirmationWidget: React.FC<TwoConfirmationWidgetProps> = ({
  title,
  onConfirm,
  onCancel,
  loading = false,
  confirmLabel = "Yes",
  cancelLabel = "No",
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-title-xs">{title}</h2>
      </div>
      <div className="flex justify-between">
        <OutlineButton
          onClick={onCancel}
          className="border-red-300 text-red-500"
        >
          <Octagon size={16} className="mr-2" />
          {cancelLabel}
        </OutlineButton>
        <OutlineButton
          loading={loading}
          onClick={onConfirm}
          className="border-success-300 text-success-500"
        >
          <Check size={16} className="mr-2" />
          {confirmLabel}
        </OutlineButton>
      </div>
    </div>
  );
};
