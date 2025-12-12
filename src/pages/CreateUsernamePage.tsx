import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Info } from "lucide-react";

export default function CreateUsernamePage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().length >= 3) {
      navigate("/pending");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto px-6">
      <div className="flex-1 flex flex-col pt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Choose your username</h1>
          <p className="text-muted-foreground">
            This will be your identity in Rheo
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-14 text-lg rounded-2xl bg-card border-border px-4"
              minLength={3}
              maxLength={20}
            />
            <p className="mt-2 text-sm text-muted-foreground">
              {username.length}/20 characters (minimum 3)
            </p>
          </div>
          
          <div className="bg-accent/30 rounded-2xl p-4 flex gap-3">
            <Info className="w-5 h-5 text-accent-foreground flex-shrink-0 mt-0.5" />
            <p className="text-sm text-foreground">
              Your request will be sent to an admin for approval. Once approved, you'll be assigned a role and can start using Rheo.
            </p>
          </div>
          
          <Button
            type="submit"
            disabled={username.trim().length < 3}
            className="w-full h-14 text-base font-semibold rounded-2xl gradient-primary text-primary-foreground shadow-lg hover:opacity-90 transition-opacity"
          >
            Send Request
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </form>
      </div>
    </div>
  );
}
