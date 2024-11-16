import { cn } from "@/lib/utils";

interface CampaignStatusProps {
  status: string;
  type?: "user" | "public";
}

export function CampaignStatus({
  status,
  type = "public",
}: CampaignStatusProps) {
  const getStatusClasses = () => {
    switch (true) {
      case status === "Completed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      case type === "user":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
      default:
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
    }
  };

  return (
    <span className={cn("px-2 py-1 text-xs rounded-full", getStatusClasses())}>
      {status}
    </span>
  );
}
