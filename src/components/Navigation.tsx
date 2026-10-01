import { Button } from "@/components/ui/button";
import { Droplet, BarChart3, Database, TrendingUp, MapPin, Home } from "lucide-react";
import { LanguageSelector } from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavigationProps {
  currentView: string;
  onNavigate: (view: 'home' | 'dashboard' | 'entry' | 'predictions' | 'map') => void;
}

export const Navigation = ({ currentView, onNavigate }: NavigationProps) => {
  const { t } = useLanguage();
  
  const navItems = [
    { id: 'home', label: t('nav.home'), icon: Home },
    { id: 'dashboard', label: t('nav.dashboard'), icon: BarChart3 },
    { id: 'entry', label: t('nav.dataEntry'), icon: Database },
    { id: 'predictions', label: t('nav.predictions'), icon: TrendingUp },
    { id: 'map', label: t('nav.map'), icon: MapPin },
  ];

  return (
    <nav className="bg-card/95 backdrop-blur border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Droplet className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t('hero.title')}
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={currentView === id ? "default" : "ghost"}
                size="sm"
                onClick={() => onNavigate(id as any)}
                className="flex items-center space-x-2"
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <div className="hidden md:block">
              <LanguageSelector />
            </div>
            <div className="md:hidden">
              <Button variant="ghost" size="sm">
                {t('nav.menu')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};