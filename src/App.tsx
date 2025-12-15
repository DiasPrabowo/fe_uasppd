import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { Layout } from "./components/Layout";
import { LoginPage } from "./components/LoginPage";
import { DashboardPage } from "./components/DashboardPage";
import { PredictionPage } from "./components/PredictionPage";
import { HistoryPage } from "./components/HistoryPage";
import { ProfilePage } from "./components/ProfilePage";

export interface PredictionRecord {
  id: string;
  timestamp: Date;
  inputs: {
    age: number;
    bmi: number;
    children: number;
    gender: string;
    smoker: string;
    region: string;
  };
  predictedPrice: number;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [predictions, setPredictions] = useState<PredictionRecord[]>([]);
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+62 812 3456 7890",
  });
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      loadData();
    } else {
      setIsLoading(false);
    }
  }, []);

  // Load data from localStorage
  const loadData = () => {
    const savedPredictions = localStorage.getItem("predictions");
    const savedProfile = localStorage.getItem("profile");

    if (savedPredictions) {
      setPredictions(JSON.parse(savedPredictions));
    }

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }

    setIsLoading(false);
  };

  // Handle login
  const handleLogin = (username: string, password: string) => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
    loadData();
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    setPredictions([]);
  };

  // Save prediction to localStorage
  const addPrediction = (prediction: PredictionRecord) => {
    const updated = [prediction, ...predictions];
    setPredictions(updated);
    localStorage.setItem("predictions", JSON.stringify(updated));
  };

  // Update profile in localStorage
  const updateUserProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem("profile", JSON.stringify(newProfile));
  };

  // Clear history from localStorage
  const clearHistory = () => {
    setPredictions([]);
    localStorage.removeItem("predictions");
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Layout onLogout={handleLogout}>
        <Routes>
          <Route
            path="/"
            element={
              <DashboardPage predictions={predictions} />
            }
          />
          <Route
            path="/prediction"
            element={
              <PredictionPage onAddPrediction={addPrediction} />
            }
          />
          <Route
            path="/history"
            element={
              <HistoryPage
                predictions={predictions}
                onClearHistory={clearHistory}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProfilePage
                profile={profile}
                onUpdateProfile={updateUserProfile}
              />
            }
          />
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}