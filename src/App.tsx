import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import SignInPage from "./pages/SignInPage";
import CreateUsernamePage from "./pages/CreateUsernamePage";
import PendingApprovalPage from "./pages/PendingApprovalPage";
import ChatsPage from "./pages/ChatsPage";
import ChatConversationPage from "./pages/ChatConversationPage";
import OfficeStatusPage from "./pages/OfficeStatusPage";
import ReportsPage from "./pages/ReportsPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Initialize theme from localStorage
  if (typeof window !== 'undefined') {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/create-username" element={<CreateUsernamePage />} />
          <Route path="/pending" element={<PendingApprovalPage />} />
          <Route path="/chats" element={<ChatsPage />} />
          <Route path="/chat/:id" element={<ChatConversationPage />} />
          <Route path="/office" element={<OfficeStatusPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
