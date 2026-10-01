import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Smartphone, Brain, Globe, Users, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { VoiceAssistant } from "./VoiceAssistant";

interface HeroSectionProps {
  onNavigate: (view: 'dashboard' | 'entry' | 'predictions' | 'map') => void;
}

export const HeroSection = ({ onNavigate }: HeroSectionProps) => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: Brain,
      title: t('hero.features.prediction'),
      description: t('hero.features.prediction.desc'),
      color: "text-primary"
    },
    {
      icon: Globe,
      title: t('nav.map'),
      description: "Virtual village mapping for disease spread visualization",
      color: "text-secondary"
    },
    {
      icon: Smartphone,
      title: t('hero.features.multilingual'),
      description: t('hero.features.multilingual.desc'),
      color: "text-warning"
    },
    {
      icon: Shield,
      title: "Early Warning",
      description: "Instant risk alerts for Low/Medium/High risk areas",
      color: "text-danger"
    }
  ];

  const impact = [
    { metric: "94%", label: t('dashboard.accuracy') },
    { metric: "3-7", label: "Days Early Warning" },
    { metric: "6+", label: "Tribal Languages" },
    { metric: "100%", label: t('hero.features.offline') }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
        <div className="container mx-auto max-w-6xl">
          <Badge variant="secondary" className="mb-6 text-sm font-medium">
            SIH 2025 - Smart Automation for Rural Health
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            {t('hero.title')}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={() => onNavigate('dashboard')}
              className="bg-gradient-to-r from-primary to-primary-glow hover:scale-105 transition-transform"
            >
              <BarChart3 className="mr-2 h-5 w-5" />
              {t('nav.dashboard')}
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => onNavigate('entry')}
              className="hover:scale-105 transition-transform"
            >
              <Database className="mr-2 h-5 w-5" />
              {t('nav.dataEntry')}
            </Button>
          </div>

          {/* Impact Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {impact.map(({ metric, label }) => (
              <Card key={label} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">{metric}</div>
                  <div className="text-sm text-muted-foreground">{label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Voice Assistant */}
          <div className="max-w-md mx-auto mt-12">
            <VoiceAssistant />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, description, color }) => (
              <Card key={title} className="hover:shadow-lg transition-all hover:scale-105">
                <CardContent className="p-6 text-center">
                  <Icon className={`h-12 w-12 mx-auto mb-4 ${color}`} />
                  <h3 className="text-lg font-semibold mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Prevent Disease Outbreaks?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of health workers and communities using AquaGuard AI
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => onNavigate('predictions')}
              className="bg-gradient-to-r from-secondary to-success hover:scale-105 transition-transform"
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              {t('nav.predictions')}
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => onNavigate('map')}
              className="hover:scale-105 transition-transform"
            >
              <Globe className="mr-2 h-5 w-5" />
              {t('nav.map')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

const BarChart3 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const Database = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="m3 5 0 14c0 3 4 3 9 3s9 0 9-3V5"></path>
    <path d="m3 12c0 3 4 3 9 3s9 0 9-3"></path>
  </svg>
);

const TrendingUp = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"></polyline>
    <polyline points="16,7 22,7 22,13"></polyline>
  </svg>
);