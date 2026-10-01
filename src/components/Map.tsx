import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Droplet, 
  AlertTriangle, 
  Users, 
  Thermometer,
  Beaker,
  Eye
} from "lucide-react";

export const Map = () => {
  const villages = [
    { 
      id: 1, 
      name: "Majuli Village Center", 
      risk: "high", 
      cases: 15, 
      population: 2500,
      waterSources: 3,
      position: { top: "20%", left: "25%" }
    },
    { 
      id: 2, 
      name: "Dibrugarh Ward 5", 
      risk: "medium", 
      cases: 8, 
      population: 1800,
      waterSources: 2,
      position: { top: "35%", left: "45%" }
    },
    { 
      id: 3, 
      name: "Jorhat Block 2", 
      risk: "low", 
      cases: 3, 
      population: 3200,
      waterSources: 5,
      position: { top: "60%", left: "30%" }
    },
    { 
      id: 4, 
      name: "Sivasagar Rural", 
      risk: "medium", 
      cases: 6, 
      population: 1500,
      waterSources: 2,
      position: { top: "45%", left: "65%" }
    },
    { 
      id: 5, 
      name: "Tinsukia District", 
      risk: "low", 
      cases: 2, 
      population: 2800,
      waterSources: 4,
      position: { top: "25%", left: "70%" }
    }
  ];

  const waterSources = [
    { 
      id: 1, 
      type: "Well", 
      quality: "poor", 
      position: { top: "22%", left: "28%" },
      ph: 5.8,
      contaminated: true
    },
    { 
      id: 2, 
      type: "Pond", 
      quality: "fair", 
      position: { top: "37%", left: "42%" },
      ph: 6.5,
      contaminated: false
    },
    { 
      id: 3, 
      type: "River", 
      quality: "good", 
      position: { top: "58%", left: "33%" },
      ph: 7.2,
      contaminated: false
    },
    { 
      id: 4, 
      type: "Tube Well", 
      quality: "fair", 
      position: { top: "47%", left: "62%" },
      ph: 6.8,
      contaminated: false
    }
  ];

  const diseaseSpread = [
    { 
      center: { top: "20%", left: "25%" }, 
      radius: "120px", 
      intensity: "high",
      day: 1
    },
    { 
      center: { top: "20%", left: "25%" }, 
      radius: "180px", 
      intensity: "medium",
      day: 3
    },
    { 
      center: { top: "20%", left: "25%" }, 
      radius: "240px", 
      intensity: "low",
      day: 7
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-danger/80 border-danger';
      case 'medium': return 'bg-warning/80 border-warning';
      case 'low': return 'bg-success/80 border-success';
      default: return 'bg-muted/80 border-border';
    }
  };

  const getWaterQualityColor = (quality: string) => {
    switch (quality) {
      case 'poor': return 'text-danger';
      case 'fair': return 'text-warning';
      case 'good': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Digital Twin - Disease Spread Simulation</h1>
          <p className="text-muted-foreground">Interactive visualization of disease patterns and water quality</p>
        </div>
        <div className="flex space-x-2">
          <Badge variant="outline">Live Simulation</Badge>
          <Badge variant="default">Real-time Data</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Map Area */}
        <div className="lg:col-span-3">
          <Card className="h-[600px]">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Northeast India - Disease Spread Map</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative h-full overflow-hidden">
              {/* Map Background */}
              <div className="absolute inset-4 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-dashed border-muted-foreground/20">
                
                {/* Disease Spread Visualization */}
                {diseaseSpread.map((spread, index) => (
                  <div
                    key={index}
                    className={`absolute rounded-full border-2 ${
                      spread.intensity === 'high' ? 'bg-danger/20 border-danger/40' :
                      spread.intensity === 'medium' ? 'bg-warning/15 border-warning/30' :
                      'bg-primary/10 border-primary/20'
                    }`}
                    style={{
                      top: spread.center.top,
                      left: spread.center.left,
                      width: spread.radius,
                      height: spread.radius,
                      transform: 'translate(-50%, -50%)',
                      animation: `pulse 2s infinite ${index * 0.5}s`
                    }}
                  />
                ))}

                {/* Villages */}
                {villages.map((village) => (
                  <div
                    key={village.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    style={{ top: village.position.top, left: village.position.left }}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 ${getRiskColor(village.risk)} flex items-center justify-center hover:scale-150 transition-transform`}>
                      <Users className="h-3 w-3 text-white" />
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <div className="bg-card border border-border rounded-lg p-3 shadow-lg min-w-48">
                        <h4 className="font-semibold text-sm">{village.name}</h4>
                        <div className="text-xs space-y-1 mt-2">
                          <div className="flex justify-between">
                            <span>Risk Level:</span>
                            <Badge variant={village.risk === 'high' ? 'destructive' : village.risk === 'medium' ? 'secondary' : 'default'} className="text-xs">
                              {village.risk.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Cases:</span>
                            <span className="font-medium">{village.cases}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Population:</span>
                            <span>{village.population.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Water Sources */}
                {waterSources.map((source) => (
                  <div
                    key={source.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    style={{ top: source.position.top, left: source.position.left }}
                  >
                    <div className={`w-4 h-4 rounded border ${getWaterQualityColor(source.quality)} bg-current/20 hover:scale-150 transition-transform`}>
                      <Droplet className="h-3 w-3 m-0.5" />
                    </div>
                    
                    {/* Water Source Tooltip */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <div className="bg-card border border-border rounded-lg p-3 shadow-lg min-w-40">
                        <h4 className="font-semibold text-sm">{source.type}</h4>
                        <div className="text-xs space-y-1 mt-2">
                          <div className="flex justify-between">
                            <span>Quality:</span>
                            <span className={`font-medium ${getWaterQualityColor(source.quality)}`}>
                              {source.quality}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>pH:</span>
                            <span>{source.ph}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Status:</span>
                            <span className={source.contaminated ? 'text-danger' : 'text-success'}>
                              {source.contaminated ? 'Contaminated' : 'Safe'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Legend */}
                <div className="absolute bottom-4 right-4 bg-card/95 border border-border rounded-lg p-3 backdrop-blur">
                  <h4 className="font-semibold text-sm mb-2">Legend</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-danger border border-danger"></div>
                      <span>High Risk Villages</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-warning border border-warning"></div>
                      <span>Medium Risk Villages</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-success border border-success"></div>
                      <span>Low Risk Villages</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Droplet className="w-3 h-3 text-primary" />
                      <span>Water Sources</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Simulation Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Simulation Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" size="sm" className="w-full">
                <Eye className="h-4 w-4 mr-2" />
                Toggle Disease Spread
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                <Droplet className="h-4 w-4 mr-2" />
                Show Water Quality
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Risk Heatmap
              </Button>
            </CardContent>
          </Card>

          {/* Real-time Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Live Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Cases</span>
                <span className="text-lg font-bold text-danger">34</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">High Risk Areas</span>
                <span className="text-lg font-bold text-warning">4</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Water Sources</span>
                <span className="text-lg font-bold text-primary">23</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Active Reporters</span>
                <span className="text-lg font-bold text-success">156</span>
              </div>
            </CardContent>
          </Card>

          {/* Environmental Data */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Environmental Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Thermometer className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Temperature</span>
                </div>
                <span className="font-medium">28°C</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Droplet className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Humidity</span>
                </div>
                <span className="font-medium">85%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Beaker className="h-4 w-4 text-purple-500" />
                  <span className="text-sm">Air Quality</span>
                </div>
                <span className="font-medium">Good</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};