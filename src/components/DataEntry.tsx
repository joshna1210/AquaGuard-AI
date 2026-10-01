import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Stethoscope, 
  Droplet, 
  MapPin, 
  User, 
  Calendar,
  ThermometerSun,
  Beaker,
  AlertCircle
} from "lucide-react";

export const DataEntry = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("symptoms");

  // Function to trigger AI analysis and store data
  const analyzeAndStoreWaterData = (data: any) => {
    const waterData = {
      location: data.location,
      ph: parseFloat(data.ph) || 7.0,
      turbidity: parseFloat(data.turbidity) || 0,
      tds: parseFloat(data.tds) || 0,
      temperature: parseFloat(data.temperature) || 25,
      color: data.color || 'clear',
      odor: data.odor || 'none',
      reporterName: data.reporterName
    };

    // Store in localStorage for AI analysis
    const existingReports = JSON.parse(localStorage.getItem('waterReports') || '[]');
    const newReport = {
      ...waterData,
      id: Date.now().toString(),
      timestamp: new Date(),
      aiScore: calculateWaterScore(waterData),
      riskLevel: getWaterRiskLevel(calculateWaterScore(waterData))
    };
    
    existingReports.unshift(newReport);
    localStorage.setItem('waterReports', JSON.stringify(existingReports));
    
    return newReport;
  };

  const analyzeAndStoreHealthData = (data: any) => {
    const healthData = {
      reporterName: data.reporterName,
      location: data.location,
      patientAge: parseInt(data.patientAge),
      symptoms: data.symptoms,
      severity: data.severity,
      duration: data.duration
    };

    // Store in localStorage for AI analysis
    const existingReports = JSON.parse(localStorage.getItem('healthReports') || '[]');
    const analysis = analyzeHealthSymptoms(healthData);
    const newReport = {
      ...healthData,
      id: Date.now().toString(),
      timestamp: new Date(),
      aiRiskScore: analysis.riskScore,
      diseaseMatch: analysis.diseaseMatch,
      riskLevel: analysis.riskLevel
    };
    
    existingReports.unshift(newReport);
    localStorage.setItem('healthReports', JSON.stringify(existingReports));
    
    return newReport;
  };

  // AI Analysis functions
  const calculateWaterScore = (data: any) => {
    let score = 100;
    if (data.ph < 6.5 || data.ph > 8.5) score -= 20;
    if (data.turbidity > 5) score -= 25;
    if (data.tds > 500) score -= 15;
    if (data.temperature > 35 || data.temperature < 10) score -= 10;
    if (data.color !== 'clear') score -= 15;
    if (data.odor !== 'none') score -= 20;
    return Math.max(0, score);
  };

  const getWaterRiskLevel = (score: number) => {
    if (score < 30) return 'High Risk';
    if (score < 60) return 'Medium Risk';
    if (score < 80) return 'Low Risk';
    return 'Safe';
  };

  const analyzeHealthSymptoms = (data: any) => {
    let riskScore = 0;
    let diseaseMatch = 'Unknown';
    
    const symptoms = data.symptoms.toLowerCase();
    
    if (symptoms.includes('diarrhea') || symptoms.includes('loose stool')) {
      riskScore += 30;
      if (symptoms.includes('fever') || symptoms.includes('vomiting')) {
        riskScore += 20;
        diseaseMatch = 'Gastroenteritis/Cholera Risk';
      } else {
        diseaseMatch = 'Diarrheal Disease';
      }
    }
    
    if (symptoms.includes('fever') && symptoms.includes('headache')) {
      riskScore += 25;
      diseaseMatch = 'Typhoid/Viral Fever Risk';
    }
    
    if (symptoms.includes('jaundice') || symptoms.includes('yellow')) {
      riskScore += 35;
      diseaseMatch = 'Hepatitis Risk';
    }

    if (data.severity === 'severe') riskScore *= 1.5;
    else if (data.severity === 'moderate') riskScore *= 1.2;

    if (data.duration === '>7d') riskScore += 20;
    else if (data.duration === '4-7d') riskScore += 10;

    riskScore = Math.min(100, riskScore);
    
    let riskLevel = 'Low Risk';
    if (riskScore > 70) riskLevel = 'High Risk';
    else if (riskScore > 40) riskLevel = 'Medium Risk';

    return { riskScore, diseaseMatch, riskLevel };
  };

  const [symptomsData, setSymptomsData] = useState({
    reporterName: "",
    location: "",
    patientAge: "",
    symptoms: "",
    severity: "",
    duration: "",
    language: "english"
  });

  const [waterData, setWaterData] = useState({
    location: "",
    ph: "",
    turbidity: "",
    tds: "",
    temperature: "",
    color: "",
    odor: "",
    reporterName: ""
  });

  const handleSymptomsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Analyze and store health data
    const analysis = analyzeAndStoreHealthData(symptomsData);
    
    toast({
      title: "✅ Health Report Analyzed",
      description: `AI Risk Level: ${analysis.riskLevel} | Disease Match: ${analysis.diseaseMatch}`,
    });
    
    setSymptomsData({
      reporterName: "",
      location: "",
      patientAge: "",
      symptoms: "",
      severity: "",
      duration: "",
      language: "english"
    });
  };

  const handleWaterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Analyze and store water data
    const analysis = analyzeAndStoreWaterData(waterData);
    
    toast({
      title: "🧪 Water Quality Analyzed",
      description: `AI Safety Score: ${analysis.aiScore}/100 | Risk Level: ${analysis.riskLevel}`,
    });
    
    setWaterData({
      location: "",
      ph: "",
      turbidity: "",
      tds: "",
      temperature: "",
      color: "",
      odor: "",
      reporterName: ""
    });
  };

  const languages = [
    { value: "english", label: "English" },
    { value: "assamese", label: "Assamese" },
    { value: "bengali", label: "Bengali" },
    { value: "bodo", label: "Bodo" },
    { value: "hindi", label: "Hindi" },
    { value: "manipuri", label: "Manipuri" }
  ];

  const severityLevels = [
    { value: "mild", label: "Mild", color: "success" },
    { value: "moderate", label: "Moderate", color: "warning" },
    { value: "severe", label: "Severe", color: "destructive" }
  ];

  const waterColors = ["Clear", "Yellowish", "Brownish", "Greenish", "Cloudy"];
  const waterOdors = ["None", "Musty", "Fishy", "Chemical", "Sewage-like"];

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Community Data Reporting</h1>
        <p className="text-muted-foreground">
          Report symptoms and water quality issues to help prevent disease outbreaks
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="symptoms" className="flex items-center space-x-2">
            <Stethoscope className="h-4 w-4" />
            <span>Health Symptoms</span>
          </TabsTrigger>
          <TabsTrigger value="water" className="flex items-center space-x-2">
            <Droplet className="h-4 w-4" />
            <span>Water Quality</span>
          </TabsTrigger>
        </TabsList>

        {/* Symptoms Reporting */}
        <TabsContent value="symptoms">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Stethoscope className="h-5 w-5" />
                <span>Report Health Symptoms</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Help us track potential disease outbreaks by reporting symptoms in your community
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSymptomsSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reporterName">Reporter Name</Label>
                    <Input
                      id="reporterName"
                      value={symptomsData.reporterName}
                      onChange={(e) => setSymptomsData({...symptomsData, reporterName: e.target.value})}
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Preferred Language</Label>
                    <Select value={symptomsData.language} onValueChange={(value) => setSymptomsData({...symptomsData, language: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={symptomsData.location}
                      onChange={(e) => setSymptomsData({...symptomsData, location: e.target.value})}
                      placeholder="Village/Ward/District"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="patientAge">Patient Age</Label>
                    <Input
                      id="patientAge"
                      type="number"
                      value={symptomsData.patientAge}
                      onChange={(e) => setSymptomsData({...symptomsData, patientAge: e.target.value})}
                      placeholder="Age in years"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="symptoms">Symptoms Observed</Label>
                  <Textarea
                    id="symptoms"
                    value={symptomsData.symptoms}
                    onChange={(e) => setSymptomsData({...symptomsData, symptoms: e.target.value})}
                    placeholder="Describe symptoms: fever, diarrhea, vomiting, abdominal pain, etc."
                    required
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="severity">Severity Level</Label>
                    <Select value={symptomsData.severity} onValueChange={(value) => setSymptomsData({...symptomsData, severity: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        {severityLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            <div className="flex items-center space-x-2">
                              <div className={`w-3 h-3 rounded-full bg-${level.color}`} />
                              <span>{level.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Select value={symptomsData.duration} onValueChange={(value) => setSymptomsData({...symptomsData, duration: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="How long?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<24h">Less than 24 hours</SelectItem>
                        <SelectItem value="1-3d">1-3 days</SelectItem>
                        <SelectItem value="4-7d">4-7 days</SelectItem>
                        <SelectItem value=">7d">More than 7 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Submit Symptoms Report
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Water Quality Reporting */}
        <TabsContent value="water">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Droplet className="h-5 w-5" />
                <span>Report Water Quality</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Monitor water sources in your area to prevent contamination-related illnesses
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleWaterSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="waterLocation">Water Source Location</Label>
                    <Input
                      id="waterLocation"
                      value={waterData.location}
                      onChange={(e) => setWaterData({...waterData, location: e.target.value})}
                      placeholder="Well/Pond/River name and location"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="waterReporter">Reporter Name</Label>
                    <Input
                      id="waterReporter"
                      value={waterData.reporterName}
                      onChange={(e) => setWaterData({...waterData, reporterName: e.target.value})}
                      placeholder="Your name"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ph">pH Level</Label>
                    <Input
                      id="ph"
                      type="number"
                      step="0.1"
                      value={waterData.ph}
                      onChange={(e) => setWaterData({...waterData, ph: e.target.value})}
                      placeholder="6.5-8.5"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="turbidity">Turbidity (NTU)</Label>
                    <Input
                      id="turbidity"
                      type="number"
                      step="0.1"
                      value={waterData.turbidity}
                      onChange={(e) => setWaterData({...waterData, turbidity: e.target.value})}
                      placeholder="<5 ideal"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tds">TDS (ppm)</Label>
                    <Input
                      id="tds"
                      type="number"
                      value={waterData.tds}
                      onChange={(e) => setWaterData({...waterData, tds: e.target.value})}
                      placeholder="<500 safe"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="temperature">Temperature (°C)</Label>
                    <Input
                      id="temperature"
                      type="number"
                      value={waterData.temperature}
                      onChange={(e) => setWaterData({...waterData, temperature: e.target.value})}
                      placeholder="20-30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="color">Water Color</Label>
                    <Select value={waterData.color} onValueChange={(value) => setWaterData({...waterData, color: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                      <SelectContent>
                        {waterColors.map((color) => (
                          <SelectItem key={color} value={color.toLowerCase()}>
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="odor">Water Odor</Label>
                    <Select value={waterData.odor} onValueChange={(value) => setWaterData({...waterData, odor: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select odor" />
                      </SelectTrigger>
                      <SelectContent>
                        {waterOdors.map((odor) => (
                          <SelectItem key={odor} value={odor.toLowerCase()}>
                            {odor}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Testing Guidelines</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        If you don't have testing equipment, observe the water visually and report any unusual color, odor, or visible contamination.
                      </p>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Submit Water Quality Report
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};