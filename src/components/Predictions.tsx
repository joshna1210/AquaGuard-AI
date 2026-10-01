import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  TrendingUp, 
  Calendar, 
  MapPin, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  BarChart3,
  Droplet,
  Activity,
  Shield,
  Database,
  Thermometer
} from "lucide-react";

interface WaterData {
  id: string;
  location: string;
  ph: number;
  turbidity: number;
  tds: number;
  temperature: number;
  color: string;
  odor: string;
  reporterName: string;
  timestamp: Date;
  aiScore: number;
  riskLevel: string;
}

interface HealthData {
  id: string;
  reporterName: string;
  location: string;
  patientAge: number;
  symptoms: string;
  severity: string;
  duration: string;
  timestamp: Date;
  aiRiskScore: number;
  diseaseMatch: string;
  riskLevel: string;
}

export const Predictions = () => {
  const [waterReports, setWaterReports] = useState<WaterData[]>([]);
  const [healthReports, setHealthReports] = useState<HealthData[]>([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedWaterData = localStorage.getItem('waterReports');
    const savedHealthData = localStorage.getItem('healthReports');
    
    if (savedWaterData) {
      setWaterReports(JSON.parse(savedWaterData));
    }
    if (savedHealthData) {
      setHealthReports(JSON.parse(savedHealthData));
    }
  }, []);

  // AI Water Quality Analysis
  const analyzeWaterQuality = (data: Omit<WaterData, 'id' | 'timestamp' | 'aiScore' | 'riskLevel'>) => {
    let score = 100;
    let riskFactors = [];

    // pH Analysis (ideal: 6.5-8.5)
    if (data.ph < 6.5 || data.ph > 8.5) {
      score -= 20;
      riskFactors.push('pH out of safe range');
    }

    // Turbidity Analysis (ideal: <5 NTU)
    if (data.turbidity > 5) {
      score -= 25;
      riskFactors.push('High turbidity detected');
    }

    // TDS Analysis (ideal: <500 ppm)
    if (data.tds > 500) {
      score -= 15;
      riskFactors.push('High dissolved solids');
    }

    // Temperature Analysis (ideal: 20-30°C)
    if (data.temperature > 35 || data.temperature < 10) {
      score -= 10;
      riskFactors.push('Temperature abnormal');
    }

    // Color and Odor Analysis
    if (data.color !== 'clear') {
      score -= 15;
      riskFactors.push('Unusual water color');
    }
    if (data.odor !== 'none') {
      score -= 20;
      riskFactors.push('Water has odor');
    }

    score = Math.max(0, score);
    
    let riskLevel = 'Safe';
    if (score < 30) riskLevel = 'High Risk';
    else if (score < 60) riskLevel = 'Medium Risk';
    else if (score < 80) riskLevel = 'Low Risk';

    return { score, riskLevel, riskFactors };
  };

  // AI Health Symptom Analysis
  const analyzeHealthSymptoms = (data: Omit<HealthData, 'id' | 'timestamp' | 'aiRiskScore' | 'diseaseMatch' | 'riskLevel'>) => {
    let riskScore = 0;
    let diseaseMatch = 'Unknown';
    
    const symptoms = data.symptoms.toLowerCase();
    
    // Disease pattern matching
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
    
    if (symptoms.includes('abdominal pain') && symptoms.includes('cramps')) {
      riskScore += 15;
    }

    // Severity multiplier
    if (data.severity === 'severe') riskScore *= 1.5;
    else if (data.severity === 'moderate') riskScore *= 1.2;

    // Duration factor
    if (data.duration === '>7d') riskScore += 20;
    else if (data.duration === '4-7d') riskScore += 10;

    riskScore = Math.min(100, riskScore);
    
    let riskLevel = 'Low Risk';
    if (riskScore > 70) riskLevel = 'High Risk';
    else if (riskScore > 40) riskLevel = 'Medium Risk';

    return { riskScore, diseaseMatch, riskLevel };
  };

  // Add new water report with AI analysis
  const addWaterReport = (data: Omit<WaterData, 'id' | 'timestamp' | 'aiScore' | 'riskLevel'>) => {
    const analysis = analyzeWaterQuality(data);
    const newReport: WaterData = {
      ...data,
      id: Date.now().toString(),
      timestamp: new Date(),
      aiScore: analysis.score,
      riskLevel: analysis.riskLevel,
    };
    
    const updatedReports = [newReport, ...waterReports];
    setWaterReports(updatedReports);
    localStorage.setItem('waterReports', JSON.stringify(updatedReports));
  };

  // Add new health report with AI analysis
  const addHealthReport = (data: Omit<HealthData, 'id' | 'timestamp' | 'aiRiskScore' | 'diseaseMatch' | 'riskLevel'>) => {
    const analysis = analyzeHealthSymptoms(data);
    const newReport: HealthData = {
      ...data,
      id: Date.now().toString(),
      timestamp: new Date(),
      aiRiskScore: analysis.riskScore,
      diseaseMatch: analysis.diseaseMatch,
      riskLevel: analysis.riskLevel,
    };
    
    const updatedReports = [newReport, ...healthReports];
    setHealthReports(updatedReports);
    localStorage.setItem('healthReports', JSON.stringify(updatedReports));
  };

  // Demo function to simulate data entry
  const generateSampleData = () => {
    const sampleWater = {
      location: "Majuli Village Well",
      ph: 6.2,
      turbidity: 8.5,
      tds: 600,
      temperature: 32,
      color: "yellowish",
      odor: "musty",
      reporterName: "Ravi Kumar"
    };
    
    const sampleHealth = {
      reporterName: "Dr. Priya",
      location: "Dibrugarh PHC",
      patientAge: 35,
      symptoms: "severe diarrhea, fever, vomiting, abdominal cramps",
      severity: "severe",
      duration: "4-7d"
    };

    addWaterReport(sampleWater);
    addHealthReport(sampleHealth);
  };
  const aiPredictions = [
    {
      area: "Majuli District",
      risk: "High",
      confidence: 94,
      daysAhead: 3,
      cases: "15-23",
      factors: ["Heavy rainfall", "Poor sanitation", "Contaminated wells"],
      color: "text-danger"
    },
    {
      area: "Dibrugarh",
      risk: "Medium",
      confidence: 87,
      daysAhead: 5,
      cases: "8-12",
      factors: ["Seasonal patterns", "Water stagnation"],
      color: "text-warning"
    },
    {
      area: "Jorhat",
      risk: "Low",
      confidence: 92,
      daysAhead: 7,
      cases: "2-5",
      factors: ["Good water management", "Active community"],
      color: "text-success"
    }
  ];

  const trendAnalysis = [
    { disease: "Diarrhea", trend: "+35%", cases: 42, prediction: "Rising" },
    { disease: "Cholera", trend: "-12%", cases: 8, prediction: "Stable" },
    { disease: "Typhoid", trend: "+8%", cases: 15, prediction: "Watch" },
    { disease: "Hepatitis A", trend: "-5%", cases: 6, prediction: "Declining" }
  ];

  const weatherCorrelation = [
    { factor: "Rainfall", impact: "High", correlation: 0.78, description: "Heavy rains increase contamination risk" },
    { factor: "Temperature", impact: "Medium", correlation: 0.65, description: "Higher temps accelerate bacterial growth" },
    { factor: "Humidity", impact: "Medium", correlation: 0.58, description: "High humidity affects water storage" },
    { factor: "Flooding", impact: "Critical", correlation: 0.89, description: "Floods contaminate water sources" }
  ];

  const preventiveActions = [
    {
      priority: "Immediate",
      action: "Deploy water purification tablets to Majuli District",
      impact: "High",
      timeline: "24 hours"
    },
    {
      priority: "Urgent",
      action: "Increase ASHA worker visits in high-risk areas",
      impact: "High",
      timeline: "48 hours"
    },
    {
      priority: "Important",
      action: "Community hygiene awareness campaign",
      impact: "Medium",
      timeline: "1 week"
    },
    {
      priority: "Monitor",
      action: "Regular water quality testing schedule",
      impact: "Medium",
      timeline: "Ongoing"
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high': case 'critical': return 'destructive';
      case 'medium': case 'urgent': return 'secondary';
      case 'low': case 'important': return 'default';
      default: return 'outline';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">AI Analysis & Reports</h1>
          <p className="text-muted-foreground">Real-time AI analysis of water quality and health symptoms</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="flex items-center space-x-2">
            <Brain className="h-4 w-4" />
            <span>94% AI Accuracy</span>
          </Badge>
          <Button onClick={generateSampleData} variant="outline" size="sm">
            <Database className="h-4 w-4 mr-2" />
            Add Sample Data
          </Button>
        </div>
      </div>

      <Tabs defaultValue="water-analysis" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="water-analysis">Water Analysis</TabsTrigger>
          <TabsTrigger value="health-analysis">Health Analysis</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="trends">Disease Trends</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
        </TabsList>

        {/* Water Quality AI Analysis */}
        <TabsContent value="water-analysis" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Droplet className="h-5 w-5" />
                  <span>AI Water Quality Analysis</span>
                  <Badge variant="secondary">{waterReports.length} Reports</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {waterReports.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Droplet className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No water quality reports yet. Submit data through Data Entry to see AI analysis.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {waterReports.slice(0, 5).map((report) => (
                      <div key={report.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <MapPin className="h-4 w-4" />
                            <span className="font-semibold">{report.location}</span>
                            <Badge variant={
                              report.riskLevel === 'High Risk' ? 'destructive' :
                              report.riskLevel === 'Medium Risk' ? 'secondary' :
                              report.riskLevel === 'Low Risk' ? 'outline' : 'default'
                            }>
                              {report.riskLevel}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">{report.aiScore}</div>
                            <div className="text-xs text-muted-foreground">AI Safety Score</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div className="bg-muted/50 p-2 rounded">
                            <div className="font-medium">pH Level</div>
                            <div className={report.ph < 6.5 || report.ph > 8.5 ? 'text-destructive' : 'text-success'}>
                              {report.ph}
                            </div>
                          </div>
                          <div className="bg-muted/50 p-2 rounded">
                            <div className="font-medium">Turbidity</div>
                            <div className={report.turbidity > 5 ? 'text-destructive' : 'text-success'}>
                              {report.turbidity} NTU
                            </div>
                          </div>
                          <div className="bg-muted/50 p-2 rounded">
                            <div className="font-medium">TDS</div>
                            <div className={report.tds > 500 ? 'text-destructive' : 'text-success'}>
                              {report.tds} ppm
                            </div>
                          </div>
                          <div className="bg-muted/50 p-2 rounded">
                            <div className="font-medium">Temperature</div>
                            <div className={report.temperature > 35 || report.temperature < 10 ? 'text-destructive' : 'text-success'}>
                              {report.temperature}°C
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <span>Reported by: {report.reporterName}</span>
                          <span>{new Date(report.timestamp).toLocaleString()}</span>
                        </div>
                        
                        <Progress value={report.aiScore} className="h-2" />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Health Symptoms AI Analysis */}
        <TabsContent value="health-analysis" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>AI Health Symptom Analysis</span>
                  <Badge variant="secondary">{healthReports.length} Reports</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {healthReports.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No health reports yet. Submit symptoms through Data Entry to see AI analysis.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {healthReports.slice(0, 5).map((report) => (
                      <div key={report.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Activity className="h-4 w-4" />
                            <span className="font-semibold">{report.location}</span>
                            <Badge variant={
                              report.riskLevel === 'High Risk' ? 'destructive' :
                              report.riskLevel === 'Medium Risk' ? 'secondary' : 'default'
                            }>
                              {report.riskLevel}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">{Math.round(report.aiRiskScore)}</div>
                            <div className="text-xs text-muted-foreground">Risk Score</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="bg-muted/50 p-3 rounded">
                            <div className="font-medium text-sm">AI Disease Match</div>
                            <div className="text-sm text-primary">{report.diseaseMatch}</div>
                          </div>
                          <div className="bg-muted/50 p-3 rounded">
                            <div className="font-medium text-sm">Severity</div>
                            <div className={`text-sm capitalize ${
                              report.severity === 'severe' ? 'text-destructive' :
                              report.severity === 'moderate' ? 'text-warning' : 'text-success'
                            }`}>
                              {report.severity}
                            </div>
                          </div>
                          <div className="bg-muted/50 p-3 rounded">
                            <div className="font-medium text-sm">Duration</div>
                            <div className="text-sm">{report.duration}</div>
                          </div>
                        </div>

                        <div className="bg-muted/20 p-3 rounded">
                          <div className="font-medium text-sm mb-1">Symptoms:</div>
                          <div className="text-sm">{report.symptoms}</div>
                        </div>

                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <span>Patient Age: {report.patientAge} | Reporter: {report.reporterName}</span>
                          <span>{new Date(report.timestamp).toLocaleString()}</span>
                        </div>
                        
                        <Progress value={report.aiRiskScore} className="h-2" />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* AI Predictions */}
        <TabsContent value="predictions" className="space-y-6">
          <div className="grid gap-6">
            {aiPredictions.map((prediction, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5" />
                      <span>{prediction.area}</span>
                    </CardTitle>
                    <Badge variant={getRiskColor(prediction.risk) as any}>
                      {prediction.risk} Risk
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{prediction.confidence}%</div>
                      <div className="text-sm text-muted-foreground">AI Confidence</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-secondary">{prediction.daysAhead}</div>
                      <div className="text-sm text-muted-foreground">Days Ahead</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-warning">{prediction.cases}</div>
                      <div className="text-sm text-muted-foreground">Predicted Cases</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Contributing Factors:</h4>
                    <div className="flex flex-wrap gap-2">
                      {prediction.factors.map((factor, factorIndex) => (
                        <Badge key={factorIndex} variant="outline">
                          {factor}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Prediction Confidence</span>
                      <span>{prediction.confidence}%</span>
                    </div>
                    <Progress value={prediction.confidence} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Disease Trends */}
        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trendAnalysis.map((disease, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{disease.disease}</h3>
                    <Badge variant={disease.prediction === 'Rising' ? 'destructive' : 
                                  disease.prediction === 'Watch' ? 'secondary' : 'default'}>
                      {disease.prediction}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Current Cases</span>
                      <span className="text-2xl font-bold">{disease.cases}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">7-day Trend</span>
                      <span className={`font-semibold ${
                        disease.trend.startsWith('+') ? 'text-danger' : 'text-success'
                      }`}>
                        {disease.trend}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Risk Factors */}
        <TabsContent value="factors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Environmental Risk Factors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {weatherCorrelation.map((factor, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold">{factor.factor}</h4>
                      <Badge variant={getRiskColor(factor.impact) as any}>
                        {factor.impact} Impact
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{factor.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-lg font-bold text-primary">{factor.correlation}</div>
                    <div className="text-xs text-muted-foreground">Correlation</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preventive Actions */}
        <TabsContent value="actions" className="space-y-6">
          <div className="space-y-4">
            {preventiveActions.map((action, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge variant={getRiskColor(action.priority) as any}>
                          {action.priority}
                        </Badge>
                        <Badge variant="outline">{action.impact} Impact</Badge>
                      </div>
                      <h4 className="font-semibold mb-2">{action.action}</h4>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Timeline: {action.timeline}</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      {action.priority === 'Immediate' ? 
                        <AlertTriangle className="h-6 w-6 text-danger" /> :
                        <CheckCircle className="h-6 w-6 text-success" />
                      }
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};