import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

import {
  Phone,
  Home,
  Users,
  Building,
  BarChart3,
  Play,
  FileText,
  AlertCircle,
  CheckCircle,
  BookOpen,
  Video,
  MessageSquare,
} from "lucide-react";
import { useToast } from "@/hooks/useToast";

interface TrainingCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  order: number;
}

interface TrainingContent {
  id: number;
  categoryId: string;
  type: string;
  title: string;
  content: string;
  description: string;
  tags: string[];
  order: number;
}

interface UserProgress {
  id: number;
  userId: string;
  contentId: number;
  completed: boolean;
  completedAt?: string;
  notes?: string;
}

const categoryIcons = {
  phone: Phone,
  home: Home,
  users: Users,
  building: Building,
  chart: BarChart3,
};

const contentTypeIcons = {
  video: Video,
  script: FileText,
  objection: MessageSquare,
};

export default function Training() {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedContent, setSelectedContent] =
    useState<TrainingContent | null>(null);
  const [notes, setNotes] = useState("");

  /* const { data: categories = [], isLoading: categoriesLoading } = useQuery<
    TrainingCategory[]
  >({
    queryKey: ["/api/training/categories"],
    retry: false,
  });

  const { data: content = [], isLoading: contentLoading } = useQuery<
    TrainingContent[]
  >({
    queryKey: ["/api/training/content", selectedCategory],
    queryFn: async () => {
      if (!selectedCategory) return [];
      const response = await fetch(`/api/training/content/${selectedCategory}`);
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      return response.json();
    },
    enabled: !!selectedCategory,
    retry: false,
  });

  const markCompletedMutation = useMutation({
    mutationFn: async (data: { contentId: number; notes?: string }) => {
      return await apiRequest("POST", "/api/training/progress", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/training/content"] });
      toast({
        title: "Progress Saved",
        description: "Your training progress has been recorded.",
      });
      setNotes("");
      setSelectedContent(null);
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

  const handleMarkCompleted = () => {
    /* if (selectedContent) {
      markCompletedMutation.mutate({
        contentId: selectedContent.id,
        notes: notes.trim() || undefined,
      });
    } */
  };

  const getCategoryIcon = (iconName: string) => {
    const IconComponent =
      categoryIcons[iconName as keyof typeof categoryIcons] || BookOpen;
    return IconComponent;
  };

  const getContentIcon = (type: string) => {
    const IconComponent =
      contentTypeIcons[type as keyof typeof contentTypeIcons] || FileText;
    return IconComponent;
  };

  const getContentTypeLabel = (type: string) => {
    switch (type) {
      case "video":
        return "Video Training";
      case "script":
        return "Script";
      case "objection":
        return "Objection Handling";
      default:
        return "Content";
    }
  };

  const getContentTypeColor = (type: string) => {
    switch (type) {
      case "video":
        return "bg-blue-100 text-blue-800";
      case "script":
        return "bg-green-100 text-green-800";
      case "objection":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Category color schemes matching goals section
  const getCategoryColorScheme = (categoryId: string) => {
    switch (categoryId) {
      case "cold-calling-fsbos":
        return {
          bgColor: "bg-blue-50 dark:bg-blue-900/20",
          borderColor: "border-blue-200 dark:border-blue-800",
          iconColor: "text-blue-600",
        };
      case "listing-presentations":
        return {
          bgColor: "bg-green-50 dark:bg-green-900/20",
          borderColor: "border-green-200 dark:border-green-800",
          iconColor: "text-green-600",
        };
      case "buyer-consultations":
        return {
          bgColor: "bg-purple-50 dark:bg-purple-900/20",
          borderColor: "border-purple-200 dark:border-purple-800",
          iconColor: "text-purple-600",
        };
      case "lead-generation":
        return {
          bgColor: "bg-orange-50 dark:bg-orange-900/20",
          borderColor: "border-orange-200 dark:border-orange-800",
          iconColor: "text-orange-600",
        };
      case "rentals":
        return {
          bgColor: "bg-teal-50 dark:bg-teal-900/20",
          borderColor: "border-teal-200 dark:border-teal-800",
          iconColor: "text-teal-600",
        };
      default:
        return {
          bgColor: "bg-gray-50 dark:bg-gray-900/20",
          borderColor: "border-gray-200 dark:border-gray-800",
          iconColor: "text-gray-600",
        };
    }
  };

  /*  if (categoriesLoading) {
    return (
      <div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }
 */
  return (
    <div>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">
            Real Estate Training Center
          </h1>
          <p className="text-neutral-600 mt-1">
            Master your skills with expert training on objections,
            presentations, and prospecting
          </p>
        </div>

        {/* Coming Soon - Virtual Broker */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-purple-600 text-white px-4 py-1 text-xs font-bold rounded-bl-lg">
            COMING SOON
          </div>
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              The Heart of My Virtual Boss — Your 24/7 Virtual Broker
            </CardTitle>
            <p className="text-lg text-gray-700 font-medium">
              We're excited to introduce the core breakthrough feature that will
              set My Virtual Boss apart — a true game-changer for new and
              struggling real estate agents.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Most agents enter the industry without personalized broker
                  support. Even in great brokerages, time is limited. A broker
                  might not be available when you need help the most — during a
                  critical call, showing, or negotiation. That lack of immediate
                  guidance can be the difference between closing a deal or
                  losing a client.
                </p>
                <div className="bg-white/70 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-bold text-gray-800 mb-2">
                    That's where My Virtual Boss steps in.
                  </h3>
                  <p className="text-gray-600 font-medium">
                    This isn't ChatGPT or a generic AI assistant.
                  </p>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Our Virtual Broker has been trained by top-producing brokers
                  and closers to replicate the real-life support, mentorship,
                  and coaching that agents need to succeed. It's not just about
                  giving you the right words — it's about showing you how to
                  deliver them.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-lg text-gray-800 mb-4">
                  You'll get:
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 bg-white/70 rounded-lg p-3 border border-blue-100">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 font-medium">
                      24/7 access to a visual, interactive broker who
                      understands the real estate grind
                    </p>
                  </div>
                  <div className="flex items-start space-x-3 bg-white/70 rounded-lg p-3 border border-purple-100">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 font-medium">
                      Scenario-based coaching to help you handle objections, win
                      clients, and close confidently
                    </p>
                  </div>
                  <div className="flex items-start space-x-3 bg-white/70 rounded-lg p-3 border border-blue-100">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 font-medium">
                      Delivery-focused training, because success isn't just what
                      you say — it's how you say it
                    </p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg p-4 border border-blue-200 mt-4">
                  <p className="text-gray-700 font-bold text-center italic">
                    This is the soul of My Virtual Boss — the daily motivator,
                    deal-saver, and career accelerator that new agents never
                    had… until now.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Training Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/*   {categories.map((category) => {
            const IconComponent = getCategoryIcon(category.icon);
            const colorScheme = getCategoryColorScheme(category.id);
            return (
              <Card
                key={category.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  colorScheme.bgColor
                } ${colorScheme.borderColor} border ${
                  selectedCategory === category.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <IconComponent
                        className={`h-5 w-5 ${colorScheme.iconColor}`}
                      />
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Training
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            );
          })} */}
        </div>

        {/* Training Content */}
        {/*  {selectedCategory && (
          <Card>
            <CardHeader>
              <CardTitle>
                {categories.find((c) => c.id === selectedCategory)?.name}{" "}
                Training Materials
              </CardTitle>
            </CardHeader>
            <CardContent>
              {contentLoading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
              ) : content.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                  <p className="text-neutral-500">
                    No training materials available for this category yet.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {content.map((item) => {
                    const ContentIcon = getContentIcon(item.type);
                    const colorScheme =
                      getCategoryColorScheme(selectedCategory);
                    return (
                      <Card
                        key={item.id}
                        className={`${colorScheme.bgColor} ${colorScheme.borderColor} border hover:shadow-md transition-all`}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <ContentIcon
                                className={`h-5 w-5 ${colorScheme.iconColor}`}
                              />
                              <CardTitle className="text-lg">
                                {item.title}
                              </CardTitle>
                            </div>
                            <Badge
                              variant="outline"
                              className={`text-xs ${getContentTypeColor(
                                item.type
                              )}`}
                            >
                              {getContentTypeLabel(item.type)}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-3">
                            {item.description}
                          </p>

                        
                          <div className="bg-white/50 rounded p-3 mb-3">
                            {item.type === "video" ? (
                              <div className="flex items-center text-sm text-gray-600">
                                <Play className="h-4 w-4 mr-2" />
                                <span>Video URL: {item.content}</span>
                              </div>
                            ) : (
                              <div className="text-sm whitespace-pre-wrap">
                                {item.content}
                              </div>
                            )}
                          </div>

                          {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {item.tags.map((tag, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}

                          <div className="flex justify-end mt-4">
                            <Button
                              size="sm"
                              onClick={() => setSelectedContent(item)}
                              className="flex items-center"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Mark as Completed
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        )} */}

        {/* Completion Modal */}
        {selectedContent && (
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-primary" />
                Complete Training: {selectedContent.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-neutral-600">
                Add any notes or key takeaways from this training session:
              </p>
              <Textarea
                placeholder="What did you learn? Any questions or insights?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedContent(null)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleMarkCompleted}
                  disabled={false}
                  className="gradient-primary text-white"
                >
                  Saving
                  {/* {markCompletedMutation.isPending
                    ? "Saving..."
                    : "Complete Training"} */}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
