import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import pendingImage from "@/assets/pending-approval.png";

export default function PendingApprovalPage() {
  const navigate = useNavigate();

  // For demo purposes, allow user to continue
  const handleContinue = () => {
    navigate("/chats");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center max-w-md mx-auto px-6">
      <div className="text-center">
        <div className="w-48 h-48 mx-auto mb-8 relative">
          <img
            src={pendingImage}
            alt="Waiting for approval"
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 rounded-full animate-shimmer" />
        </div>
        
        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-warning/10 text-warning rounded-full mb-6">
          <span className="w-2 h-2 bg-warning rounded-full animate-pulse-soft" />
          <span className="text-sm font-medium">Pending</span>
        </div>
        
        <h1 className="text-2xl font-bold text-foreground mb-3">
          Awaiting Admin Approval
        </h1>
        <p className="text-muted-foreground mb-8">
          You'll be notified once your role is assigned. This usually takes a few hours.
        </p>
        
        {/* Demo button - in production this would be hidden */}
        <Button
          onClick={handleContinue}
          variant="outline"
          className="rounded-2xl h-12 px-6"
        >
          Continue to Demo →
        </Button>
      </div>
    </div>
  );
}
