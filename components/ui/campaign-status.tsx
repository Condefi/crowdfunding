import { cn } from "@/lib/utils";

interface CampaignStatusProps {
  status: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function CampaignStatus({ status, size = "md" }: CampaignStatusProps) {
  const getStatusClasses = () => {
    switch (status) {
      case "Failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "Active":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-2 py-0.5 text-xs";
      case "lg":
        return "px-3 py-1.5 text-sm";
      case "xl":
        return "px-4 py-2 text-base";
      default:
        return "px-2 py-1 text-xs";
    }
  };

  return (
    <span className={cn("rounded-full", getSizeClasses(), getStatusClasses())}>
      {status}
    </span>
  );
}
