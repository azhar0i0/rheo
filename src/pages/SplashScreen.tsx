import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import splashBg from "@/assets/splash-bg.png";

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/signin");
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden">
      <img
        src={splashBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-foreground/80" />
      
      <div className="relative z-10 text-center">
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto gradient-primary rounded-3xl flex items-center justify-center shadow-2xl">
            <span className="text-4xl font-bold text-primary-foreground">R</span>
          </div>
        </div>
        
        <h1 className="text-5xl font-bold text-primary-foreground mb-3 tracking-tight">
          Rheo
        </h1>
        <p className="text-primary-foreground/80 text-lg font-medium tracking-wide">
          Workflows in Motion
        </p>
        
        <div className="mt-12 flex items-center justify-center gap-2">
          <span className="w-2 h-2 bg-primary-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 bg-primary-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 bg-primary-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
