import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Plus,
  DollarSign,
  TrendingUp,
  Home,
  Building,
  Users,
  Calendar,
  Target,
  PieChart,
  BarChart3,
} from "lucide-react";
import { useToast } from "@/hooks/useToast";

interface Income {
  id: number;
  type: string;
  amount: string;
  description: string;
  date: string;
  quarter: number;
  year: number;
  propertyAddress?: string;
  createdAt: string;
}

interface PendingIncome {
  id: number;
  type: string;
  amount: string;
  description: string;
  expectedDate: string;
  quarter: number;
  year: number;
  likelihood: string;
  propertyAddress?: string;
  createdAt: string;
  updatedAt: string;
}

interface Goal {
  id: number;
  type: string;
  targetValue: string;
  currentValue: string;
  quarter?: number;
  year: number;
  isCompleted: boolean;
}

const incomeTypes = [
  {
    value: "sale",
    label: "Sale Commission",
    icon: Home,
    color: "text-primary",
  },
  {
    value: "rental",
    label: "Rental Commission",
    icon: Building,
    color: "text-secondary",
  },
  {
    value: "management",
    label: "Management Income",
    icon: Users,
    color: "text-accent",
  },
  {
    value: "referral",
    label: "Referral Fee",
    icon: TrendingUp,
    color: "text-purple-600",
  },
  {
    value: "other",
    label: "Other Income",
    icon: DollarSign,
    color: "text-green-600",
  },
];

export default function Income() {
  const { toast } = useToast();
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [showPendingIncome, setShowPendingIncome] = useState(false);
  const currentYear = new Date().getFullYear();
  const [selectedQuarter, setSelectedQuarter] = useState<number | null>(null);
  const [newIncome, setNewIncome] = useState({
    type: "sale",
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    propertyAddress: "",
  });
  const [pendingIncome, setPendingIncome] = useState({
    type: "sale",
    amount: "",
    description: "",
    expectedDate: "",
    propertyAddress: "",
    likelihood: "high",
  });
  /* 
  const { data: income = [], isLoading } = useQuery<Income[]>({
    queryKey: ["/api/income", currentYear, selectedQuarter],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("year", currentYear.toString());
      if (selectedQuarter) {
        params.append("quarter", selectedQuarter.toString());
      }
      const response = await fetch(`/api/income?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      return response.json();
    },
    retry: false,
  }); */

  /* const { data: pendingIncomeData = [] } = useQuery<PendingIncome[]>({
    queryKey: ["/api/pending-income", currentYear, selectedQuarter],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("year", currentYear.toString());
      if (selectedQuarter) {
        params.append("quarter", selectedQuarter.toString());
      }
      const response = await fetch(`/api/pending-income?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      return response.json();
    },
    retry: false,
  }); */

  /* const { data: goals = [] } = useQuery<Goal[]>({
    queryKey: ["/api/goals", currentYear],
    queryFn: async () => {
      const response = await fetch(`/api/goals?year=${currentYear}`);
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      return response.json();
    },
    retry: false,
  }); */

  /* const { data: user } = useQuery({
    queryKey: ["/api/auth/user"],
    queryFn: async () => {
      const response = await fetch("/api/auth/user");
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      return response.json();
    },
    retry: false,
  }); */

  /* const createIncomeMutation = useMutation({
    mutationFn: async (incomeData: any) => {
      const date = new Date(incomeData.date);
      const quarter = Math.ceil((date.getMonth() + 1) / 3);
      const year = date.getFullYear();

      return await apiRequest("POST", "/api/income", {
        ...incomeData,
        quarter,
        year,
        amount: incomeData.amount,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/income"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
      queryClient.invalidateQueries({ queryKey: ["/api/activities"] });
      setShowAddIncome(false);
      resetForm();
      toast({
        title: "Income Recorded",
        description: "Your income has been successfully recorded.",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  }); */

  /* const createPendingIncomeMutation = useMutation({
    mutationFn: async (pendingIncomeData: any) => {
      const expectedDate = new Date(pendingIncomeData.expectedDate);
      const quarter = Math.ceil((expectedDate.getMonth() + 1) / 3);
      const year = expectedDate.getFullYear();

      return await apiRequest("POST", "/api/pending-income", {
        ...pendingIncomeData,
        quarter,
        year,
        amount: pendingIncomeData.amount,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pending-income"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
      queryClient.invalidateQueries({ queryKey: ["/api/activities"] });
      setShowPendingIncome(false);
      resetPendingForm();
      toast({
        title: "Pending Income Recorded",
        description: "Your pending income has been successfully recorded.",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  }); */

  const resetForm = () => {
    setNewIncome({
      type: "sale",
      amount: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      propertyAddress: "",
    });
  };

  const resetPendingForm = () => {
    setPendingIncome({
      type: "sale",
      amount: "",
      description: "",
      expectedDate: "",
      propertyAddress: "",
      likelihood: "high",
    });
  };

  const handleRecordPending = () => {
    if (!pendingIncome.amount || parseFloat(pendingIncome.amount) <= 0) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid amount.",
        variant: "destructive",
      });
      return;
    }

    if (!pendingIncome.expectedDate) {
      toast({
        title: "Validation Error",
        description: "Please enter an expected date.",
        variant: "destructive",
      });
      return;
    }

    // createPendingIncomeMutation.mutate(pendingIncome);
  };

  const handleCreateIncome = () => {
    if (!newIncome.amount || parseFloat(newIncome.amount) <= 0) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid amount.",
        variant: "destructive",
      });
      return;
    }

    //createIncomeMutation.mutate(newIncome);
  };

  const getIncomeTypeData = (type: string) => {
    return incomeTypes.find((t) => t.value === type) || incomeTypes[0];
  };

  const getTotalIncome = () => {
    //return income.reduce((sum, item) => sum + parseFloat(item.amount), 0);
  };

  const getTotalPendingIncome = () => {
    /*   return pendingIncomeData.reduce(
      (sum, item) => sum + parseFloat(item.amount),
      0
    ); */
  };

  const getWeightedPendingIncome = () => {
    /* return pendingIncomeData.reduce((sum, item) => {
      const amount = parseFloat(item.amount);
      const multiplier =
        item.likelihood === "high"
          ? 0.8
          : item.likelihood === "medium"
          ? 0.5
          : 0.3;
      return sum + amount * multiplier;
    }, 0); */
  };

  const getIncomeByType = () => {
    /* return incomeTypes.map((type) => ({
      ...type,
      total: income
        .filter((item) => item.type === type.value)
        .reduce((sum, item) => sum + parseFloat(item.amount), 0),
    })); */
  };

  const getQuarterlyData = () => {
    const quarters = [1, 2, 3, 4];
    /*  return quarters.map((quarter) => {
      const quarterIncome = income
        .filter((item) => item.quarter === quarter)
        .reduce((sum, item) => sum + parseFloat(item.amount), 0);

      const quarterPending = pendingIncomeData
        .filter((item) => item.quarter === quarter)
        .reduce((sum, item) => sum + parseFloat(item.amount), 0);

      const quarterGoal = goals.find(
        (goal) => goal.type === "quarterly_income" && goal.quarter === quarter
      );

      const goalValue = quarterGoal ? parseFloat(quarterGoal.targetValue) : 0;
      const totalWithPending = quarterIncome + quarterPending;

      return {
        quarter,
        income: quarterIncome,
        pending: quarterPending,
        total: totalWithPending,
        goal: goalValue,
        percentage: goalValue > 0 ? (quarterIncome / goalValue) * 100 : 0,
        totalPercentage:
          goalValue > 0 ? (totalWithPending / goalValue) * 100 : 0,
      };
    }); */
  };

  const currentQuarter = Math.ceil((new Date().getMonth() + 1) / 3);
  /*  const currentQuarterData = getQuarterlyData().find(
    (q) => q.quarter === currentQuarter
  );
 */
  return (
    <div>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">
              Income Tracking
            </h1>
            <p className="text-neutral-600 mt-1">
              Monitor your earnings and track progress toward your goals
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowAddIncome(true)}
              className="gradient-primary text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Record Income
            </Button>
            <Button
              onClick={() => setShowPendingIncome(true)}
              className="gradient-primary text-white"
            >
              <Target className="h-4 w-4 mr-2" />
              Record Pending Income
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-primary">
                    Total Income
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {/*   ${getTotalIncome().toLocaleString()} */}
                  </p>
                  <p className="text-xs text-primary/70 mt-1">
                    Goal: $
                    {/*     {user?.desiredAnnualIncome
                      ? parseFloat(user.desiredAnnualIncome).toLocaleString()
                      : "0"} */}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-secondary/5 border-secondary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary">
                    This Quarter
                  </p>
                  {/*     <p className="text-2xl font-bold text-secondary">
                    ${currentQuarterData?.income.toLocaleString() || "0"}
                  </p>
                  <p className="text-xs text-secondary/70 mt-1">
                    Goal: ${currentQuarterData?.goal.toLocaleString() || "0"}
                  </p> */}
                </div>
                <Target className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-accent/5 border-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-full">
                  <p className="text-sm font-medium text-accent mb-3">
                    Transactions
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-accent/80">
                        Sales Closed
                      </span>
                      {/*  <span className="text-lg font-bold text-accent">
                        {income.filter((i) => i.type === "sale").length}
                      </span> */}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-accent/80">
                        Rentals Closed
                      </span>
                      {/* <span className="text-lg font-bold text-accent">
                        {income.filter((i) => i.type === "rental").length}
                      </span> */}
                    </div>
                  </div>
                </div>
                <Home className="h-8 w-8 text-accent ml-4" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">
                    Pending Income
                  </p>
                  {/*   <p className="text-2xl font-bold text-purple-600">
                    ${getTotalPendingIncome().toLocaleString()}
                  </p> */}
                  <p className="text-xs text-purple-600/70 mt-1">
                    Expected income
                  </p>
                </div>
                <Target className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Quarter Progress */}
            {/*   {currentQuarterData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2" />Q{currentQuarter}{" "}
                    Progress
                  </CardTitle>
                  <p className="text-sm text-neutral-600">
                    Quarter {currentQuarter} {currentYear}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded gradient-success"></div>
                          <span className="text-sm font-medium">
                            Earned Income
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold">
                            ${currentQuarterData.income.toLocaleString()} / $
                            {currentQuarterData.goal.toLocaleString()}
                          </span>
                          <Badge
                            variant={
                              currentQuarterData.percentage >= 100
                                ? "default"
                                : "outline"
                            }
                            className="ml-2"
                          >
                            {Math.round(currentQuarterData.percentage)}%
                          </Badge>
                        </div>
                      </div>
                      <div className="w-full bg-neutral-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full gradient-success transition-all duration-300"
                          style={{
                            width: `${Math.min(
                              currentQuarterData.percentage,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

            
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded bg-purple-500"></div>
                          <span className="text-sm font-medium">
                            Pending Income
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold">
                            ${currentQuarterData.pending.toLocaleString()} / $
                            {currentQuarterData.goal.toLocaleString()}
                          </span>
                          <Badge
                            variant="outline"
                            className="ml-2 text-purple-600 border-purple-200"
                          >
                            {Math.round(
                              (currentQuarterData.pending /
                                currentQuarterData.goal) *
                                100
                            )}
                            %
                          </Badge>
                        </div>
                      </div>
                      <div className="w-full bg-neutral-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-300"
                          style={{
                            width: `${Math.min(
                              (currentQuarterData.pending /
                                currentQuarterData.goal) *
                                100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

                 
                    <div className="pt-4 border-t border-neutral-200">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-neutral-600">
                          Combined Total
                        </span>
                        <div className="text-right">
                          <span className="text-lg font-bold">
                            ${currentQuarterData.total.toLocaleString()} / $
                            {currentQuarterData.goal.toLocaleString()}
                          </span>
                          <Badge
                            variant={
                              currentQuarterData.totalPercentage >= 100
                                ? "default"
                                : "outline"
                            }
                            className="ml-2"
                          >
                            {Math.round(currentQuarterData.totalPercentage)}%
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )} */}

            {/* Quarterly Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Quarterly Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/*  <div className="space-y-6">
                  {getQuarterlyData().map((quarter) => (
                    <div key={quarter.quarter} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold">
                          Q{quarter.quarter}
                        </span>
                        <div className="text-right">
                          <span className="text-sm font-medium text-neutral-600">
                            Total: ${quarter.total.toLocaleString()} / $
                            {quarter.goal.toLocaleString()}
                          </span>
                          <Badge
                            variant={
                              quarter.totalPercentage >= 100
                                ? "default"
                                : "outline"
                            }
                            className="ml-2"
                          >
                            {Math.round(quarter.totalPercentage)}%
                          </Badge>
                        </div>
                      </div>

      
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded gradient-success"></div>
                            <span className="text-sm text-neutral-600">
                              Earned
                            </span>
                          </div>
                          <span className="text-sm font-medium">
                            ${quarter.income.toLocaleString()} (
                            {Math.round(quarter.percentage)}%)
                          </span>
                        </div>
                        <div className="w-full bg-neutral-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              quarter.percentage >= 100
                                ? "gradient-success"
                                : "gradient-primary"
                            }`}
                            style={{
                              width: `${Math.min(quarter.percentage, 100)}%`,
                            }}
                          />
                        </div>
                      </div>

                   
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded bg-purple-500"></div>
                            <span className="text-sm text-neutral-600">
                              Pending
                            </span>
                          </div>
                          <span className="text-sm font-medium">
                            ${quarter.pending.toLocaleString()} (
                            {Math.round((quarter.pending / quarter.goal) * 100)}
                            %)
                          </span>
                        </div>
                        <div className="w-full bg-neutral-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-300"
                            style={{
                              width: `${Math.min(
                                (quarter.pending / quarter.goal) * 100,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>

                      {quarter.quarter < getQuarterlyData().length && (
                        <hr className="border-neutral-200" />
                      )}
                    </div>
                  ))}
                </div> */}
              </CardContent>
            </Card>
          </div>

          {/* Income Breakdown */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2" />
                  Income by Type
                </CardTitle>
              </CardHeader>
              {/*  <CardContent>
                <div className="space-y-4">
                  {getIncomeByType().map((type) => {
                    const Icon = type.icon;
                    const percentage =
                      getTotalIncome() > 0
                        ? (type.total / getTotalIncome()) * 100
                        : 0;

                    return (
                      <div
                        key={type.value}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <Icon className={`h-4 w-4 ${type.color}`} />
                          <span className="text-sm font-medium">
                            {type.label}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            ${type.total.toLocaleString()}
                          </div>
                          <div className="text-xs text-neutral-500">
                            {Math.round(percentage)}%
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent> */}
            </Card>

            {/* Recent Income */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Income</CardTitle>
              </CardHeader>
              {/* <CardContent>
                <div className="space-y-4">
                  {income.slice(0, 5).map((item) => {
                    const typeData = getIncomeTypeData(item.type);
                    const Icon = typeData.icon;

                    return (
                      <div
                        key={item.id}
                        className="flex items-center space-x-3"
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center bg-neutral-100`}
                        >
                          <Icon className={`h-4 w-4 ${typeData.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-neutral-900">
                            ${parseFloat(item.amount).toLocaleString()}
                          </p>
                          <p className="text-xs text-neutral-500 truncate">
                            {item.description || typeData.label}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant="outline"
                            className={`text-xs ${typeData.color}`}
                          >
                            {typeData.label}
                          </Badge>
                          <p className="text-xs text-neutral-500 mt-1">
                            {new Date(item.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    );
                  })}

                  {income.length === 0 && (
                    <div className="text-center py-6 text-neutral-500">
                      <DollarSign className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No income recorded yet</p>
                    </div>
                  )}
                </div>
              </CardContent> */}
            </Card>

            {/* Pending Income */}
            <Card>
              <CardHeader>
                <CardTitle>Pending Commissions</CardTitle>
              </CardHeader>
              {/*  <CardContent>
                <div className="space-y-4">
                  {pendingIncomeData.slice(0, 5).map((item) => {
                    const typeData = getIncomeTypeData(item.type);
                    const Icon = typeData.icon;
                    const amount = parseFloat(item.amount);

                    return (
                      <div
                        key={item.id}
                        className="flex items-center space-x-3"
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center bg-neutral-100`}
                        >
                          <Icon className={`h-4 w-4 ${typeData.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-neutral-900">
                            ${amount.toLocaleString()}
                          </p>
                          <p className="text-xs text-neutral-500 truncate">
                            {item.description || typeData.label}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant="outline"
                            className={`text-xs mb-1 ${
                              item.likelihood === "high"
                                ? "text-green-600 border-green-200"
                                : item.likelihood === "medium"
                                ? "text-yellow-600 border-yellow-200"
                                : "text-red-600 border-red-200"
                            }`}
                          >
                            {item.likelihood} likelihood
                          </Badge>
                          <p className="text-xs text-neutral-500 mt-1">
                            Expected:{" "}
                            {new Date(item.expectedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    );
                  })}

                  {pendingIncomeData.length === 0 && (
                    <div className="text-center py-6 text-neutral-500">
                      <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No pending income recorded yet</p>
                    </div>
                  )}
                </div>
              </CardContent> */}
            </Card>
          </div>
        </div>

        {/* Detailed Income List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Income History</span>
              <div className="flex items-center space-x-2">
                <Select
                  value={selectedQuarter?.toString() || "all"}
                  onValueChange={(value) =>
                    setSelectedQuarter(value === "all" ? null : parseInt(value))
                  }
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="All Quarters" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Quarters</SelectItem>
                    <SelectItem value="1">Q1</SelectItem>
                    <SelectItem value="2">Q2</SelectItem>
                    <SelectItem value="3">Q3</SelectItem>
                    <SelectItem value="4">Q4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardTitle>
          </CardHeader>
          {/* <CardContent>
            {income.length === 0 ? (
              <div className="text-center py-12">
                <DollarSign className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-neutral-900 mb-2">
                  No income recorded
                </h3>
                <p className="text-neutral-500 mb-4">
                  Start tracking your real estate income.
                </p>
                <Button
                  onClick={() => setShowAddIncome(true)}
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Record First Income
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {income.map((item) => {
                  const typeData = getIncomeTypeData(item.type);
                  const Icon = typeData.icon;

                  return (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 p-4 border border-neutral-200 rounded-lg"
                    >
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center bg-neutral-100`}
                      >
                        <Icon className={`h-6 w-6 ${typeData.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-neutral-900">
                              ${parseFloat(item.amount).toLocaleString()}
                            </h3>
                            <p className="text-sm text-neutral-600 mt-1">
                              {item.description || typeData.label}
                            </p>
                            {item.propertyAddress && (
                              <p className="text-sm text-neutral-500 mt-1">
                                Property: {item.propertyAddress}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className={typeData.color}>
                              {typeData.label}
                            </Badge>
                            <div className="flex items-center text-sm text-neutral-500 mt-2">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(item.date).toLocaleDateString()}
                            </div>
                            <p className="text-xs text-neutral-400 mt-1">
                              Q{item.quarter} {item.year}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent> */}
        </Card>
      </div>

      {/* Add Pending Income Modal */}
      {showPendingIncome && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md slide-up">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-blue-600" />
                Record Pending Income
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Income Type
                </label>
                <Select
                  value={pendingIncome.type}
                  onValueChange={(value) =>
                    setPendingIncome((prev) => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {incomeTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Expected Amount
                </label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="3500.00"
                  value={pendingIncome.amount}
                  onChange={(e) =>
                    setPendingIncome((prev) => ({
                      ...prev,
                      amount: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Expected Close Date
                </label>
                <Input
                  type="date"
                  value={pendingIncome.expectedDate}
                  onChange={(e) =>
                    setPendingIncome((prev) => ({
                      ...prev,
                      expectedDate: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Likelihood
                </label>
                <Select
                  value={pendingIncome.likelihood}
                  onValueChange={(value) =>
                    setPendingIncome((prev) => ({ ...prev, likelihood: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High (80% likely)</SelectItem>
                    <SelectItem value="medium">Medium (50% likely)</SelectItem>
                    <SelectItem value="low">Low (30% likely)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Description
                </label>
                <Textarea
                  placeholder="Pending commission from 123 Main St..."
                  value={pendingIncome.description}
                  onChange={(e) =>
                    setPendingIncome((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Property Address (Optional)
                </label>
                <Input
                  placeholder="123 Main Street, Miami, FL"
                  value={pendingIncome.propertyAddress}
                  onChange={(e) =>
                    setPendingIncome((prev) => ({
                      ...prev,
                      propertyAddress: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  <strong>Projection:</strong> $
                  {pendingIncome.amount
                    ? parseFloat(pendingIncome.amount).toLocaleString()
                    : "0"}{" "}
                  ×{" "}
                  {pendingIncome.likelihood === "high"
                    ? "80%"
                    : pendingIncome.likelihood === "medium"
                    ? "50%"
                    : "30%"}{" "}
                  = $
                  {pendingIncome.amount
                    ? Math.round(
                        parseFloat(pendingIncome.amount) *
                          (pendingIncome.likelihood === "high"
                            ? 0.8
                            : pendingIncome.likelihood === "medium"
                            ? 0.5
                            : 0.3)
                      ).toLocaleString()
                    : "0"}{" "}
                  weighted projection
                </p>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowPendingIncome(false);
                    resetPendingForm();
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleRecordPending}
                  className="flex-1 gradient-primary text-white"
                >
                  Record Pending
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add Income Modal */}
      {showAddIncome && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md slide-up">
            <CardHeader>
              <CardTitle>Record New Income</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Income Type
                </label>
                <Select
                  value={newIncome.type}
                  onValueChange={(value) =>
                    setNewIncome((prev) => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {incomeTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Amount</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="3500.00"
                  value={newIncome.amount}
                  onChange={(e) =>
                    setNewIncome((prev) => ({
                      ...prev,
                      amount: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Date</label>
                <Input
                  type="date"
                  value={newIncome.date}
                  onChange={(e) =>
                    setNewIncome((prev) => ({ ...prev, date: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Description
                </label>
                <Textarea
                  placeholder="Commission from 123 Main St sale..."
                  value={newIncome.description}
                  onChange={(e) =>
                    setNewIncome((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Property Address (Optional)
                </label>
                <Input
                  placeholder="123 Main Street, Miami, FL"
                  value={newIncome.propertyAddress}
                  onChange={(e) =>
                    setNewIncome((prev) => ({
                      ...prev,
                      propertyAddress: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowAddIncome(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateIncome}
                  disabled={false}
                  className="flex-1 gradient-primary text-white"
                >
                  Record
                  {/*   {createIncomeMutation.isPending
                    ? "Recording..."
                    : "Record Income"} */}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
