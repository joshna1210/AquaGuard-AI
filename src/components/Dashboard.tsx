import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Users, Droplet, TrendingUp, MapPin, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Dashboard = () => {
  const { t } = useLanguage();
  const riskAreas = [
    { name: "Majuli District", risk: "high", cases: 15, trend: "+45%" },
    { name: "Dibrugarh", risk: "medium", cases: 8, trend: "+12%" },
    { name: "Jorhat", risk: "low", cases: 3, trend: "-8%" },
    { name: "Sivasagar", risk: "medium", cases: 6, trend: "+23%" }
  ];

  const recentReports = [
    { time: "2 hours ago", location: "Majuli Village 3", type: "Symptoms", reporter: "ASHA Worker" },
    { time: "4 hours ago", location: "Dibrugarh Ward 5", type: "Water Quality", reporter: "Community Volunteer" },
    { time: "6 hours ago", location: "Jorhat Block 2", type: "Symptoms", reporter: "Health Worker" },
    { time: "8 hours ago", location: "Sivasagar Rural", type: "Water Quality", reporter: "Village Leader" }
  ];

  const waterQuality = [
    { param: "pH Level", value: 6.8, status: "good", range: "6.5-8.5" },
    { param: "Turbidity", value: 4.2, status: "warning", range: "<5 NTU" },
    { param: "TDS", value: 320, status: "good", range: "<500 ppm" },
    { param: "Temperature", value: 24, status: "good", range: "20-30°C" }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-danger';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'default';
      default: return 'outline';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t('dashboard.title')}</h1>
        <Badge variant="outline" className="flex items-center space-x-1">
          <Calendar className="h-4 w-4" />
          <span>Last Updated: 2 minutes ago</span>
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-8 w-8 text-danger" />
              <div>
                <p className="text-2xl font-bold text-danger">4</p>
                <p className="text-sm text-muted-foreground">High Risk Areas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">Active Reporters</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Droplet className="h-8 w-8 text-secondary" />
              <div>
                <p className="text-2xl font-bold">32</p>
                <p className="text-sm text-muted-foreground">Cases Reported</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">94%</p>
                <p className="text-sm text-muted-foreground">AI Accuracy</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Areas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Risk Assessment by Area</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {riskAreas.map((area) => (
              <div key={area.name} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <Badge variant={getRiskBadge(area.risk) as any}>
                    {area.risk.toUpperCase()}
                  </Badge>
                  <div>
                    <p className="font-semibold">{area.name}</p>
                    <p className="text-sm text-muted-foreground">{area.cases} reported cases</p>
                  </div>
                </div>
                <div className={`text-right ${area.trend.startsWith('+') ? 'text-danger' : 'text-success'}`}>
                  <p className="font-semibold">{area.trend}</p>
                  <p className="text-xs text-muted-foreground">vs last week</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Water Quality */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Droplet className="h-5 w-5" />
              <span>Water Quality Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {waterQuality.map((param) => (
              <div key={param.param} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{param.param}</span>
                  <div className="text-right">
                    <span className={`font-semibold ${
                      param.status === 'good' ? 'text-success' : 
                      param.status === 'warning' ? 'text-warning' : 'text-danger'
                    }`}>
                      {param.value}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">({param.range})</span>
                  </div>
                </div>
                <Progress 
                  value={param.status === 'good' ? 80 : param.status === 'warning' ? 60 : 30} 
                  className={`h-2 ${
                    param.status === 'good' ? '[&>div]:bg-success' : 
                    param.status === 'warning' ? '[&>div]:bg-warning' : '[&>div]:bg-danger'
                  }`}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentReports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    report.type === 'Symptoms' ? 'bg-danger' : 'bg-primary'
                  }`} />
                  <div>
                    <p className="font-semibold">{report.location}</p>
                    <p className="text-sm text-muted-foreground">{report.type} • by {report.reporter}</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{report.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};