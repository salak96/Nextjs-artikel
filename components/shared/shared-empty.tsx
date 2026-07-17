import { sharedEmptyConfig } from "@/config/shared";
import { AlertTriangle } from "lucide-react";

const SharedEmpty = () => {
  return (
    <div className="mx-auto my-5 max-w-3xl rounded-xl border-2 border-dashed border-border bg-card p-12 text-center">
      <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground" />
      <h3 className="mt-3 text-lg font-semibold text-card-foreground">
        {sharedEmptyConfig.title}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {sharedEmptyConfig.description}
      </p>
    </div>
  );
};

export default SharedEmpty;
