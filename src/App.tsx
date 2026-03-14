// App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "./components/ScrollToTop";
import { PageTransition } from "./components/PageTransition";

// Pages
import Index from "./pages/Index";
import Blog from "./pages/Blog/Blog";
import StartProject from "./pages/StartProject";
import NotFound from "./pages/NotFound";

// Services
import AllServices from "./pages/AllServices";
import WebServices from "./pages/Services/WebServices";
import AppServices from "./pages/Services/AppServices";
import BackendServices from "./pages/Services/BackendServices";
import SaasServices from "./pages/Services/SaasServices";
import APIIntegrationServices from "./pages/Services/APIIntegrationsServices";
import CustomSoftwareServices from "./pages/Services/CustomSoftwareServices";
import BlogDetail from "./pages/Blog/BlogDetail";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Home */}
        <Route
          path="/"
          element={
            <PageTransition>
              <Index />
            </PageTransition>
          }
        />

        {/* Services */}
        <Route path="/all-services" element={<PageTransition><AllServices /></PageTransition>} />
        <Route path="/web-services" element={<PageTransition><WebServices /></PageTransition>} />
        <Route path="/app-services" element={<PageTransition><AppServices /></PageTransition>} />
        <Route path="/backend-services" element={<PageTransition><BackendServices /></PageTransition>} />
        <Route path="/saas-services" element={<PageTransition><SaasServices /></PageTransition>} />
        <Route path="/custom-software-services" element={<PageTransition><CustomSoftwareServices /></PageTransition>} />
        <Route path="/api-integration-services" element={<PageTransition><APIIntegrationServices /></PageTransition>} />

        {/* Other pages */}
        <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="/blog-detail" element={<PageTransition><BlogDetail /></PageTransition>} />
        <Route path="/start-project" element={<PageTransition><StartProject /></PageTransition>} />

        {/* 404 Not Found */}
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
