import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
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
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminChannelsPage from "./pages/admin/AdminChannelsPage";
import AdminReportsPage from "./pages/admin/AdminReportsPage";
import AdminOfficePage from "./pages/admin/AdminOfficePage";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    }
  }, []);

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
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/channels" element={<AdminChannelsPage />} />
            <Route path="/admin/reports" element={<AdminReportsPage />} />
            <Route path="/admin/office" element={<AdminOfficePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
