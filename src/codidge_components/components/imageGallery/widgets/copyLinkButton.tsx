import { useState } from "react";
import { Check, Copy } from "lucide-react";
import TextButton from "../../../UI/button/TextButton";

export const CopyButton = ({ url }: { url: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);

      // Reset icon after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <TextButton onClick={handleCopyLink}>
      {copied ? (
        <Check className="w-4 h-4 mr-2 text-green-500" />
      ) : (
        <Copy className="w-4 h-4 mr-2" />
      )}
      {copied ? "Copied!" : "Copy Link"}
    </TextButton>
  );
};
