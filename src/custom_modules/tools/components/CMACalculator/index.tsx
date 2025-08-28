import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Search,
  MapPin,
  TrendingUp,
  Building,
  Info,
  DollarSign,
  Eye,
  Star,
  Calendar,
} from "lucide-react";

interface ValueEstimate {
  source: string;
  value: number;
  confidence: string;
  lastUpdated: string;
  badge: string;
  color: string;
}

interface PropertyInfo {
  address: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  yearBuilt: number;
  propertyType: string;
  imageUrl: string;
}

export default function CMACalculator() {
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [propertyInfo, setPropertyInfo] = useState<PropertyInfo | null>(null);
  const [valueEstimates, setValueEstimates] = useState<ValueEstimate[]>([]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const generateMockData = (
    inputAddress: string
  ): { property: PropertyInfo; estimates: ValueEstimate[] } => {
    // Generate consistent mock data based on address
    const addressHash = inputAddress
      .split("")
      .reduce((a, b) => a + b.charCodeAt(0), 0);
    const baseValue = 300000 + (addressHash % 500000);

    const property: PropertyInfo = {
      address: inputAddress,
      bedrooms: 3 + (addressHash % 3),
      bathrooms: 2 + (addressHash % 2),
      sqft: 1500 + (addressHash % 1000),
      yearBuilt: 1980 + (addressHash % 40),
      propertyType: ["Single Family", "Condo", "Townhouse"][addressHash % 3],
      imageUrl: `https://images.unsplash.com/photo-1560518821-${(
        addressHash % 100
      )
        .toString()
        .padStart(2, "0")}-${((addressHash * 2) % 100)
        .toString()
        .padStart(2, "0")}-${((addressHash * 3) % 100)
        .toString()
        .padStart(2, "0")}`,
    };

    const estimates: ValueEstimate[] = [
      {
        source: "Zillow Zestimate",
        value: Math.round(baseValue * (1 + ((addressHash % 20) - 10) / 100)),
        confidence: "Medium",
        lastUpdated: "2 days ago",
        badge: "Popular",
        color: "bg-blue-50 border-blue-200 text-blue-800",
      },
      {
        source: "Redfin Estimate",
        value: Math.round(
          baseValue * (1 + (((addressHash * 2) % 20) - 10) / 100)
        ),
        confidence: "High",
        lastUpdated: "1 day ago",
        badge: "Professional",
        color: "bg-red-50 border-red-200 text-red-800",
      },
      {
        source: "Realtor.com RVM",
        value: Math.round(
          baseValue * (1 + (((addressHash * 3) % 20) - 10) / 100)
        ),
        confidence: "Medium",
        lastUpdated: "3 days ago",
        badge: "MLS Data",
        color: "bg-green-50 border-green-200 text-green-800",
      },
      {
        source: "County Tax Assessment",
        value: Math.round(
          baseValue * 0.85 * (1 + (((addressHash * 4) % 15) - 7) / 100)
        ),
        confidence: "Official",
        lastUpdated: "2024 Assessment",
        badge: "Government",
        color: "bg-purple-50 border-purple-200 text-purple-800",
      },
      {
        source: "Comparable Sales Avg",
        value: Math.round(
          baseValue * (1 + (((addressHash * 5) % 18) - 9) / 100)
        ),
        confidence: "High",
        lastUpdated: "Last 6 months",
        badge: "Market Data",
        color: "bg-orange-50 border-orange-200 text-orange-800",
      },
    ];

    return { property, estimates };
  };

  const handleAnalyze = async () => {
    if (!address.trim()) return;

    setLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockData = generateMockData(address.trim());
    setPropertyInfo(mockData.property);
    setValueEstimates(mockData.estimates);
    setShowResults(true);
    setLoading(false);
  };

  const resetCalculator = () => {
    setAddress("");
    setShowResults(false);
    setPropertyInfo(null);
    setValueEstimates([]);
  };

  const averageValue =
    valueEstimates.length > 0
      ? valueEstimates.reduce((sum, est) => sum + est.value, 0) /
        valueEstimates.length
      : 0;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-6 w-6 text-primary" />
            Comparative Market Analysis (CMA)
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Get property value estimates from multiple sources
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {!showResults ? (
            <>
              {/* Input Form */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Property Address
                  </Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="123 Main Street, City, State, ZIP"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter any address to see sample market analysis
                  </p>
                </div>

                <Alert className="border-blue-200 bg-blue-50">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>Demo Mode:</strong> This is a mockup showing sample
                    data. In production, this would connect to real estate APIs
                    like Zillow, Redfin, MLS databases, and county records for
                    authentic property valuations.
                  </AlertDescription>
                </Alert>

                <Button
                  onClick={handleAnalyze}
                  disabled={!address.trim() || loading}
                  className="w-full"
                  size="lg"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Analyzing Property...
                    </div>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Generate Market Analysis
                    </>
                  )}
                </Button>
              </div>
            </>
          ) : (
            propertyInfo && (
              <>
                {/* Results */}
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold">
                        Market Analysis Results
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {propertyInfo.address}
                      </p>
                    </div>
                    <Button variant="outline" onClick={resetCalculator}>
                      New Analysis
                    </Button>
                  </div>

                  {/* Property Image */}
                  <Card className="overflow-hidden">
                    <div className="relative">
                      <img
                        src={`https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop&crop=center`}
                        alt={`Property at ${propertyInfo.address}`}
                        className="w-full h-64 object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop&crop=center";
                        }}
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/90 text-gray-800">
                          <Eye className="h-3 w-3 mr-1" />
                          Street View
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Bedrooms
                          </p>
                          <p className="font-semibold">
                            {propertyInfo.bedrooms}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Bathrooms
                          </p>
                          <p className="font-semibold">
                            {propertyInfo.bathrooms}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Square Feet
                          </p>
                          <p className="font-semibold">
                            {propertyInfo.sqft.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Year Built
                          </p>
                          <p className="font-semibold">
                            {propertyInfo.yearBuilt}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Type</p>
                          <p className="font-semibold">
                            {propertyInfo.propertyType}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Average Value Summary */}
                  <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                    <CardContent className="p-6 text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <h3 className="text-lg font-semibold tex 14 -green-800">
                          Average Market Value
                        </h3>
                      </div>
                      <p className="text-3xl font-bold text-green-900 mb-1">
                        {formatCurrency(averageValue)}
                      </p>
                      <p className="text-sm text-green-700">
                        Based on {valueEstimates.length} data sources
                      </p>
                    </CardContent>
                  </Card>

                  {/* Value Estimates from 5 Sources */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Building className="h-5 w-5" />
                      Value Estimates by Source
                    </h3>
                    <div className="grid gap-4">
                      {valueEstimates.map((estimate, index) => (
                        <Card
                          key={index}
                          className={`${estimate.color} border-2`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/50 rounded-lg flex items-center justify-center">
                                  <DollarSign className="h-6 w-6" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-semibold">
                                      {estimate.source}
                                    </h4>
                                    <Badge
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {estimate.badge}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <Star className="h-3 w-3" />
                                      {estimate.confidence} Confidence
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Calendar className="h-3 w-3" />
                                      {estimate.lastUpdated}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold">
                                  {formatCurrency(estimate.value)}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {((estimate.value - averageValue) /
                                    averageValue) *
                                    100 >
                                  0
                                    ? "+"
                                    : ""}
                                  {(
                                    ((estimate.value - averageValue) /
                                      averageValue) *
                                    100
                                  ).toFixed(1)}
                                  % from avg
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Disclaimer */}
                  <Alert className="border-orange-200 bg-orange-50">
                    <Info className="h-4 w-4 text-orange-600" />
                    <AlertDescription className="text-orange-800">
                      <strong>Important:</strong> These are sample estimates for
                      demonstration purposes. Real property valuations require
                      professional appraisal, market analysis, and physical
                      inspection of the property condition and unique features.
                    </AlertDescription>
                  </Alert>
                </div>
              </>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}
