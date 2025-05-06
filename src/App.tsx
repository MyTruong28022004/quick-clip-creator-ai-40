
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Create from "./pages/Create";
import Library from "./pages/Library";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Auth from "./pages/Auth";
import AllTrendingTopics from "./pages/AllTrendingTopics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/all-trending-topics" element={<AllTrendingTopics />} />
          
          {/* Protected Routes */}
          <Route element={<Auth />}>
            <Route path="/" element={<Index />} />
            <Route path="/create" element={<Create />} />
            <Route path="/library" element={<Library />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
