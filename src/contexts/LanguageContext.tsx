import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.dataEntry': 'Data Entry',
    'nav.predictions': 'AI Predictions',
    'nav.map': 'Digital Twin',
    'nav.menu': 'Menu',

    // Hero Section
    'hero.title': 'AquaGuard AI',
    'hero.subtitle': 'AI-Powered Early Warning System for Water-Borne Disease Prevention',
    'hero.description': 'Protecting rural communities in Northeast India through intelligent water quality monitoring and health surveillance.',
    'hero.getStarted': 'Get Started',
    'hero.learnMore': 'Learn More',
    'hero.features.prediction': 'Outbreak Prediction',
    'hero.features.prediction.desc': '3-day advance warning with 94% accuracy',
    'hero.features.multilingual': 'Multilingual Support',
    'hero.features.multilingual.desc': 'Voice alerts in 6+ tribal languages',
    'hero.features.offline': 'Offline First',
    'hero.features.offline.desc': 'Works without internet connectivity',
    'hero.features.integration': 'Government Integration',
    'hero.features.integration.desc': 'Syncs with NHM, Jal Shakti, and IHIP',

    // Dashboard
    'dashboard.title': 'Health & Water Monitoring Dashboard',
    'dashboard.overview': 'System Overview',
    'dashboard.totalReports': 'Total Reports',
    'dashboard.riskAreas': 'Risk Areas',
    'dashboard.alertsSent': 'Alerts Sent',
    'dashboard.accuracy': 'Prediction Accuracy',
    'dashboard.recentAlerts': 'Recent Alerts',
    'dashboard.waterQuality': 'Water Quality Status',
    'dashboard.healthReports': 'Health Reports',
    'dashboard.riskMap': 'Risk Assessment Map',
    'dashboard.safe': 'Safe',
    'dashboard.moderate': 'Moderate Risk',
    'dashboard.high': 'High Risk',

    // Data Entry
    'dataEntry.title': 'Health & Water Data Entry',
    'dataEntry.waterQuality': 'Water Quality Data',
    'dataEntry.healthSymptoms': 'Health Symptoms Report',
    'dataEntry.location': 'Location',
    'dataEntry.location.placeholder': 'Enter village/area name',
    'dataEntry.ph': 'pH Level',
    'dataEntry.ph.placeholder': 'Enter pH value (0-14)',
    'dataEntry.turbidity': 'Turbidity (NTU)',
    'dataEntry.turbidity.placeholder': 'Enter turbidity value',
    'dataEntry.tds': 'TDS (ppm)',
    'dataEntry.tds.placeholder': 'Enter TDS value',
    'dataEntry.temperature': 'Temperature (°C)',
    'dataEntry.temperature.placeholder': 'Enter temperature',
    'dataEntry.symptoms': 'Symptoms',
    'dataEntry.symptoms.placeholder': 'Describe health symptoms observed',
    'dataEntry.affectedCount': 'Affected People Count',
    'dataEntry.affectedCount.placeholder': 'Number of people affected',
    'dataEntry.submit': 'Submit Data',
    'dataEntry.success': 'Data submitted successfully!',

    // Predictions
    'predictions.title': 'AI-Powered Risk Assessment',
    'predictions.waterAnalysis': 'Water Quality Analysis',
    'predictions.healthAnalysis': 'Health Risk Analysis',
    'predictions.overallRisk': 'Overall Risk Score',
    'predictions.recommendations': 'Recommendations',
    'predictions.score': 'Risk Score',
    'predictions.status': 'Status',
    'predictions.safe': 'Safe',
    'predictions.risk': 'Risk Detected',
    'predictions.noData': 'No analysis data available. Please submit water quality or health data first.',

    // Map
    'map.title': 'Digital Twin - Risk Visualization',
    'map.description': 'Real-time visualization of water quality and health risks across monitoring areas',
    'map.legend': 'Risk Level Legend',
    'map.low': 'Low Risk',
    'map.medium': 'Medium Risk',
    'map.high': 'High Risk',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error occurred',
    'common.success': 'Success',
    'common.warning': 'Warning',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.close': 'Close',
    'common.speak': 'Speak',
    'common.language': 'Language',
    'common.selectLanguage': 'Select Language',
  },
  hi: {
    // Navigation
    'nav.home': 'मुख्य पृष्ठ',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.dataEntry': 'डेटा एंट्री',
    'nav.predictions': 'एआई भविष्यवाणी',
    'nav.map': 'डिजिटल ट्विन',
    'nav.menu': 'मेनू',

    // Hero Section
    'hero.title': 'एक्वागार्ड एआई',
    'hero.subtitle': 'जल-जनित रोग की रोकथाम के लिए एआई-संचालित प्रारंभिक चेतावनी प्रणाली',
    'hero.description': 'बुद्धिमान जल गुणवत्ता निगरानी और स्वास्थ्य निगरानी के माध्यम से पूर्वोत्तर भारत के ग्रामीण समुदायों की सुरक्षा।',
    'hero.getStarted': 'शुरू करें',
    'hero.learnMore': 'और जानें',
    'hero.features.prediction': 'प्रकोप की भविष्यवाणी',
    'hero.features.prediction.desc': '94% सटीकता के साथ 3-दिन की अग्रिम चेतावनी',
    'hero.features.multilingual': 'बहुभाषी समर्थन',
    'hero.features.multilingual.desc': '6+ आदिवासी भाषाओं में आवाज अलर्ट',
    'hero.features.offline': 'ऑफ़लाइन फर्स्ट',
    'hero.features.offline.desc': 'इंटरनेट कनेक्टिविटी के बिना काम करता है',
    'hero.features.integration': 'सरकारी एकीकरण',
    'hero.features.integration.desc': 'NHM, जल शक्ति, और IHIP के साथ सिंक',

    // Dashboard
    'dashboard.title': 'स्वास्थ्य और जल निगरानी डैशबोर्ड',
    'dashboard.overview': 'सिस्टम अवलोकन',
    'dashboard.totalReports': 'कुल रिपोर्ट्स',
    'dashboard.riskAreas': 'जोखिम क्षेत्र',
    'dashboard.alertsSent': 'भेजे गए अलर्ट',
    'dashboard.accuracy': 'भविष्यवाणी सटीकता',
    'dashboard.recentAlerts': 'हाल की चेतावनियां',
    'dashboard.waterQuality': 'जल गुणवत्ता स्थिति',
    'dashboard.healthReports': 'स्वास्थ्य रिपोर्ट',
    'dashboard.riskMap': 'जोखिम मूल्यांकन मानचित्र',
    'dashboard.safe': 'सुरक्षित',
    'dashboard.moderate': 'मध्यम जोखिम',
    'dashboard.high': 'उच्च जोखिम',

    // Data Entry
    'dataEntry.title': 'स्वास्थ्य और जल डेटा एंट्री',
    'dataEntry.waterQuality': 'जल गुणवत्ता डेटा',
    'dataEntry.healthSymptoms': 'स्वास्थ्य लक्षण रिपोर्ट',
    'dataEntry.location': 'स्थान',
    'dataEntry.location.placeholder': 'गांव/क्षेत्र का नाम दर्ज करें',
    'dataEntry.ph': 'पीएच स्तर',
    'dataEntry.ph.placeholder': 'पीएच मान दर्ज करें (0-14)',
    'dataEntry.turbidity': 'मैलापन (NTU)',
    'dataEntry.turbidity.placeholder': 'मैलापन मान दर्ज करें',
    'dataEntry.tds': 'TDS (ppm)',
    'dataEntry.tds.placeholder': 'TDS मान दर्ज करें',
    'dataEntry.temperature': 'तापमान (°C)',
    'dataEntry.temperature.placeholder': 'तापमान दर्ज करें',
    'dataEntry.symptoms': 'लक्षण',
    'dataEntry.symptoms.placeholder': 'देखे गए स्वास्थ्य लक्षणों का वर्णन करें',
    'dataEntry.affectedCount': 'प्रभावित लोगों की संख्या',
    'dataEntry.affectedCount.placeholder': 'प्रभावित लोगों की संख्या',
    'dataEntry.submit': 'डेटा जमा करें',
    'dataEntry.success': 'डेटा सफलतापूर्वक जमा किया गया!',

    // Predictions
    'predictions.title': 'एआई-संचालित जोखिम मूल्यांकन',
    'predictions.waterAnalysis': 'जल गुणवत्ता विश्लेषण',
    'predictions.healthAnalysis': 'स्वास्थ्य जोखिम विश्लेषण',
    'predictions.overallRisk': 'समग्र जोखिम स्कोर',
    'predictions.recommendations': 'सिफारिशें',
    'predictions.score': 'जोखिम स्कोर',
    'predictions.status': 'स्थिति',
    'predictions.safe': 'सुरक्षित',
    'predictions.risk': 'जोखिम का पता चला',
    'predictions.noData': 'कोई विश्लेषण डेटा उपलब्ध नहीं है। कृपया पहले जल गुणवत्ता या स्वास्थ्य डेटा जमा करें।',

    // Map
    'map.title': 'डिजिटल ट्विन - जोखिम विज़ुअलाइज़ेशन',
    'map.description': 'निगरानी क्षेत्रों में जल गुणवत्ता और स्वास्थ्य जोखिमों का वास्तविक समय विज़ुअलाइज़ेशन',
    'map.legend': 'जोखिम स्तर लीजेंड',
    'map.low': 'कम जोखिम',
    'map.medium': 'मध्यम जोखिम',
    'map.high': 'उच्च जोखिम',

    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि हुई',
    'common.success': 'सफलता',
    'common.warning': 'चेतावनी',
    'common.back': 'वापस',
    'common.next': 'अगला',
    'common.save': 'सेव करें',
    'common.cancel': 'रद्द करें',
    'common.close': 'बंद करें',
    'common.speak': 'बोलें',
    'common.language': 'भाषा',
    'common.selectLanguage': 'भाषा चुनें',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};