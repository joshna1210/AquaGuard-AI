import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { Dashboard } from "@/components/Dashboard";
import { DataEntry } from "@/components/DataEntry";
import { Predictions } from "@/components/Predictions";
import { Map } from "@/components/Map";

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'dashboard' | 'entry' | 'predictions' | 'map'>('home');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'entry':
        return <DataEntry />;
      case 'predictions':
        return <Predictions />;
      case 'map':
        return <Map />;
      default:
        return <HeroSection onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentView={currentView} onNavigate={setCurrentView} />
      {renderView()}
    </div>
  );
};

export default Index;