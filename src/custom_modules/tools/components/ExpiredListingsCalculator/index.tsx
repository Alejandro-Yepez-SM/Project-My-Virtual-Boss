import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  MapPin,
  Calendar,
  Building,
  Info,
  Eye,
  Phone,
  Mail,
  User,
  Clock,
  Home,
  ShieldCheck,
  ShieldX,
  ArrowRight,
  Send,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface ExpiredListing {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  mlsNumber: string;
  originalPrice: number;
  lastPrice: number;
  daysOnMarket: number;
  expiredDate: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  yearBuilt: number;
  propertyType: string;
  listingAgent: string;
  estimatedValue: number;
}

interface SkipTraceData {
  ownerName: string;
  coOwnerName?: string;
  phoneNumbers: Array<{
    number: string;
    type: string;
    onDoNotCall: boolean;
    confidence: string;
  }>;
  emailAddresses: Array<{
    email: string;
    type: string;
    confidence: string;
  }>;
  mailingAddress: string;
  occupancyStatus: string;
  equityEstimate: number;
}

export default function ExpiredListingsCalculator() {
  const [zipCode, setZipCode] = useState<string>("");
  const [daysBack, setDaysBack] = useState<string>("");
  const [mlsStatus, setMlsStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [expiredListings, setExpiredListings] = useState<ExpiredListing[]>([]);
  const [selectedListing, setSelectedListing] = useState<ExpiredListing | null>(
    null
  );
  const [skipTraceData, setSkipTraceData] = useState<SkipTraceData | null>(
    null
  );
  const [showDetails, setShowDetails] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<string>("");
  const [customMessage, setCustomMessage] = useState<string>("");
  const [sendingEmail, setSendingEmail] = useState(false);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const generateMockExpiredListings = (
    zip: string,
    days: string,
    _: string
  ): ExpiredListing[] => {
    const zipHash = zip.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
    const count = 8 + (zipHash % 12); // 8-20 listings

    const listings: ExpiredListing[] = [];
    const streets = [
      "Main St",
      "Oak Ave",
      "Cedar Ln",
      "Pine Dr",
      "Maple Way",
      "Elm St",
      "Park Blvd",
      "River Rd",
    ];
    const propertyTypes = [
      "Single Family",
      "Townhouse",
      "Condo",
      "Multi-Family",
    ];
    const agents = [
      "Sarah Johnson",
      "Mike Davis",
      "Lisa Chen",
      "Robert Smith",
      "Jennifer Williams",
      "David Brown",
    ];

    for (let i = 0; i < count; i++) {
      const seed = zipHash + i;
      const basePrice = 200000 + (seed % 800000);
      const daysOnMarket = 30 + (seed % 365);
      const priceReduction = 0.05 + (seed % 20) / 100; // 5-25% reduction

      listings.push({
        id: `EXP${seed.toString().slice(-6)}`,
        address: `${100 + (seed % 9999)} ${streets[seed % streets.length]}`,
        city: "Sample City",
        state: "FL",
        zipCode: zip,
        mlsNumber: `MLS${(seed * 7).toString().slice(-7)}`,
        originalPrice: Math.round(basePrice),
        lastPrice: Math.round(basePrice * (1 - priceReduction)),
        daysOnMarket: daysOnMarket,
        expiredDate: new Date(
          Date.now() - parseInt(days) * 24 * 60 * 60 * 1000 + (seed % 86400000)
        ).toLocaleDateString(),
        bedrooms: 2 + (seed % 4),
        bathrooms: 1 + (seed % 3),
        sqft: 1200 + (seed % 2000),
        yearBuilt: 1960 + (seed % 60),
        propertyType: propertyTypes[seed % propertyTypes.length],
        listingAgent: agents[seed % agents.length],
        estimatedValue: Math.round(basePrice * (0.9 + (seed % 20) / 100)),
      });
    }

    return listings.sort(
      (a, b) =>
        new Date(b.expiredDate).getTime() - new Date(a.expiredDate).getTime()
    );
  };

  const generateMockSkipTrace = (listing: ExpiredListing): SkipTraceData => {
    const seed = listing.address
      .split("")
      .reduce((a, b) => a + b.charCodeAt(0), 0);
    const firstNames = [
      "John",
      "Mary",
      "David",
      "Jennifer",
      "Michael",
      "Sarah",
      "Robert",
      "Lisa",
    ];
    const lastNames = [
      "Smith",
      "Johnson",
      "Williams",
      "Brown",
      "Jones",
      "Garcia",
      "Miller",
      "Davis",
    ];

    return {
      ownerName: `${firstNames[seed % firstNames.length]} ${
        lastNames[(seed * 2) % lastNames.length]
      }`,
      coOwnerName:
        seed % 3 === 0
          ? `${firstNames[(seed * 3) % firstNames.length]} ${
              lastNames[(seed * 2) % lastNames.length]
            }`
          : undefined,
      phoneNumbers: [
        {
          number: `(${Math.floor(200 + (seed % 800))}) ${Math.floor(
            200 + ((seed * 2) % 800)
          )}-${Math.floor(1000 + ((seed * 3) % 9000))}`,
          type: "Mobile",
          onDoNotCall: seed % 4 === 0,
          confidence: seed % 2 === 0 ? "High" : "Medium",
        },
        ...(seed % 3 === 0
          ? [
              {
                number: `(${Math.floor(200 + ((seed * 4) % 800))}) ${Math.floor(
                  200 + ((seed * 5) % 800)
                )}-${Math.floor(1000 + ((seed * 6) % 9000))}`,
                type: "Landline",
                onDoNotCall: (seed * 2) % 5 === 0,
                confidence: "Medium",
              },
            ]
          : []),
      ],
      emailAddresses: [
        {
          email: `${firstNames[
            seed % firstNames.length
          ].toLowerCase()}.${lastNames[
            (seed * 2) % lastNames.length
          ].toLowerCase()}@${
            ["gmail.com", "yahoo.com", "outlook.com", "aol.com"][seed % 4]
          }`,
          type: "Personal",
          confidence: "High",
        },
        ...(seed % 4 === 0
          ? [
              {
                email: `${firstNames[seed % firstNames.length].toLowerCase()}${
                  seed % 100
                }@${["gmail.com", "yahoo.com"][seed % 2]}`,
                type: "Secondary",
                confidence: "Medium",
              },
            ]
          : []),
      ],
      mailingAddress:
        seed % 5 === 0
          ? `PO Box ${1000 + (seed % 9000)}, ${listing.city}, ${
              listing.state
            } ${listing.zipCode}`
          : listing.address,
      occupancyStatus: seed % 3 === 0 ? "Owner Occupied" : "Vacant",
      equityEstimate: Math.round(
        listing.estimatedValue * (0.6 + (seed % 40) / 100)
      ),
    };
  };

  const handleSearch = async () => {
    if (!zipCode.trim() || !daysBack || !mlsStatus) return;

    setLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const listings = generateMockExpiredListings(
      zipCode.trim(),
      daysBack,
      mlsStatus
    );
    setExpiredListings(listings);
    setShowResults(true);
    setLoading(false);
  };

  const handleGetDetails = async (listing: ExpiredListing) => {
    setSelectedListing(listing);
    setLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const skipTrace = generateMockSkipTrace(listing);
    setSkipTraceData(skipTrace);
    setShowDetails(true);
    setLoading(false);
  };

  const resetCalculator = () => {
    setZipCode("");
    setDaysBack("");
    setMlsStatus("");
    setShowResults(false);
    setShowDetails(false);
    setExpiredListings([]);
    setSelectedListing(null);
    setSkipTraceData(null);
  };

  const getExpiredListingEmailTemplate = (
    listing: ExpiredListing,
    ownerInfo: SkipTraceData
  ) => {
    const daysExpired = Math.floor(
      (Date.now() - new Date(listing.expiredDate).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    const priceReduction = (
      ((listing.originalPrice - listing.lastPrice) / listing.originalPrice) *
      100
    ).toFixed(1);

    return {
      subject: `New Marketing Strategy for Your ${listing.propertyType} at ${listing.address}`,
      body: `Dear ${ownerInfo.ownerName},

I hope this message finds you well. I noticed that your ${listing.propertyType.toLowerCase()} property at ${
        listing.address
      } recently came off the market after ${listing.daysOnMarket} days.

I understand how frustrating it can be when a property doesn't sell as expected, especially after adjusting the price from ${formatCurrency(
        listing.originalPrice
      )} to ${formatCurrency(
        listing.lastPrice
      )} (a ${priceReduction}% reduction). The good news is that your property has excellent potential, and I believe with the right marketing strategy, we can achieve the results you're looking for.

What caught my attention about your property:
• ${listing.bedrooms} bedrooms, ${
        listing.bathrooms
      } bathrooms, ${listing.sqft.toLocaleString()} sqft
• Built in ${listing.yearBuilt}
• Current estimated value: ${formatCurrency(listing.estimatedValue)}
• Strong equity position: ${formatCurrency(ownerInfo.equityEstimate)}

As a local real estate professional, I've successfully helped many homeowners in similar situations. Here's what I can offer that may have been missing from your previous listing experience:

🎯 **Fresh Marketing Approach**
• Professional photography and virtual staging
• Targeted digital marketing to qualified buyers
• Strategic pricing based on current market analysis
• Enhanced MLS exposure and syndication

📊 **Market Intelligence**
• Your property has been off the market for ${daysExpired} days - perfect timing for a fresh start
• Current market conditions may be more favorable than when you initially listed
• I have insights into what buyers in your area are specifically looking for

💼 **Proven Track Record**
• Specialized experience with previously expired listings
• Strong negotiation skills to maximize your sale price
• Dedicated marketing budget for your property
• Full-service approach to minimize your stress

I'd love to discuss how I can help you achieve a successful sale. Many sellers are surprised by the difference a new perspective and marketing strategy can make. 

Would you be available for a brief, no-obligation conversation this week? I can provide:

✓ A fresh market analysis showing current value and pricing strategy
✓ A comprehensive marketing plan tailored to your property
✓ References from other satisfied sellers with similar situations
✓ Clear timeline and expectations for getting your home sold

Your ${listing.propertyType.toLowerCase()} deserves the right exposure to the right buyers. I'm confident I can deliver the results you've been waiting for.

Please feel free to call or email me at your convenience. I look forward to helping you move forward with your real estate goals.

Best regards,
[Your Name]
[Your Contact Information]

P.S. The longer a property sits off the market, the more buyers assume there might be issues. Let's get your home back in front of motivated buyers with a winning strategy!`,
    };
  };

  const handleSendEmail = async () => {
    if (!selectedEmail || !selectedListing || !skipTraceData) return;

    setSendingEmail(true);

    try {
      const template = getExpiredListingEmailTemplate(
        selectedListing,
        skipTraceData
      );
      const emailData = {
        to: selectedEmail,
        subject: template.subject,
        body: customMessage || template.body,
      };

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        // Add contact to CRM
        await addContactToCRM();
        alert("Email sent successfully!");
        setShowEmailModal(false);
        setCustomMessage("");
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      alert("Failed to send email. Please check your email configuration.");
    } finally {
      setSendingEmail(false);
    }
  };

  const addContactToCRM = async () => {
    if (!selectedListing || !skipTraceData || !selectedEmail) return;

    try {
      /*    const template = getExpiredListingEmailTemplate(
        selectedListing,
        skipTraceData
      );
      const currentDate = new Date().toLocaleDateString();

      // Extract first and last name from owner name
      const nameParts = skipTraceData.ownerName.split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || ""; */
      /*  const contactData = {
        firstName,
        lastName,
        email: selectedEmail,
        phone:
          skipTraceData.phoneNumbers.length > 0
            ? skipTraceData.phoneNumbers[0].number
            : "",
        category: "Expired",
        source: "Email Campaign",
        address: selectedListing.address,
        city: selectedListing.city,
        state: selectedListing.state,
        zipCode: selectedListing.zipCode,
        notes: `Email sent on ${currentDate}\nSubject: ${template.subject}\nExpired listing from ${selectedListing.expiredDate}`,
        leadScore: 75,
        lastContactDate: new Date().toISOString().split("T")[0],
        nextFollowUpDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0], // 3 days from now
      };
 */
      /*   await apiRequest("POST", "/api/contacts", contactData);
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] }); */
    } catch (error) {
      console.error("Failed to add contact to CRM:", error);
    }
  };

  const openEmailModal = (email: string) => {
    setSelectedEmail(email);
    setShowEmailModal(true);
  };

  if (showDetails && selectedListing && skipTraceData) {
    return (
      <div className="w-full max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setShowDetails(false)}
            className="flex items-center gap-2"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to Results
          </Button>
          <div>
            <h2 className="text-2xl font-bold">Complete Property Details</h2>
            <p className="text-muted-foreground">{selectedListing.address}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* MLS Data */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-blue-600" />
                MLS Property Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">
                    MLS Number
                  </Label>
                  <p className="font-semibold">{selectedListing.mlsNumber}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">
                    Property Type
                  </Label>
                  <p className="font-semibold">
                    {selectedListing.propertyType}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">
                    Original Price
                  </Label>
                  <p className="font-semibold text-red-600">
                    {formatCurrency(selectedListing.originalPrice)}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">
                    Last Price
                  </Label>
                  <p className="font-semibold text-blue-600">
                    {formatCurrency(selectedListing.lastPrice)}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">
                    Days on Market
                  </Label>
                  <p className="font-semibold">
                    {selectedListing.daysOnMarket} days
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">
                    Expired Date
                  </Label>
                  <p className="font-semibold">{selectedListing.expiredDate}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">
                    Bedrooms
                  </Label>
                  <p className="font-semibold">{selectedListing.bedrooms} BR</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">
                    Bathrooms
                  </Label>
                  <p className="font-semibold">
                    {selectedListing.bathrooms} BA
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">
                    Square Feet
                  </Label>
                  <p className="font-semibold">
                    {selectedListing.sqft.toLocaleString()} sqft
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">
                    Year Built
                  </Label>
                  <p className="font-semibold">{selectedListing.yearBuilt}</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-muted-foreground">
                    Estimated Current Value
                  </Label>
                  <p className="text-lg font-bold text-green-600">
                    {formatCurrency(selectedListing.estimatedValue)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-muted-foreground">
                    Listing Agent
                  </Label>
                  <p className="font-semibold">
                    {selectedListing.listingAgent}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skip Trace Data */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-purple-600" />
                Owner Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm text-muted-foreground">
                  Primary Owner
                </Label>
                <p className="font-semibold text-lg">
                  {skipTraceData.ownerName}
                </p>
                {skipTraceData.coOwnerName && (
                  <>
                    <Label className="text-sm text-muted-foreground">
                      Co-Owner
                    </Label>
                    <p className="font-semibold">{skipTraceData.coOwnerName}</p>
                  </>
                )}
              </div>

              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">
                  Phone Numbers
                </Label>
                <div className="space-y-2">
                  {skipTraceData.phoneNumbers.map((phone, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">{phone.number}</span>
                        <Badge variant="outline" className="text-xs">
                          {phone.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            phone.confidence === "High"
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {phone.confidence}
                        </Badge>
                        {phone.onDoNotCall ? (
                          <Badge variant="destructive" className="text-xs">
                            <ShieldX className="h-3 w-3 mr-1" />
                            DNC
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs">
                            <ShieldCheck className="h-3 w-3 mr-1" />
                            OK
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">
                  Email Addresses
                </Label>
                <div className="space-y-2">
                  {skipTraceData.emailAddresses.map((email, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-sm">
                          {email.email}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {email.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            email.confidence === "High"
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {email.confidence}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEmailModal(email.email)}
                          className="h-6 px-2 text-xs"
                        >
                          <Send className="h-3 w-3 mr-1" />
                          Send Email
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-4 border-t">
                <div>
                  <Label className="text-sm text-muted-foreground">
                    Mailing Address
                  </Label>
                  <p className="font-medium">{skipTraceData.mailingAddress}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">
                    Occupancy Status
                  </Label>
                  <Badge
                    variant={
                      skipTraceData.occupancyStatus === "Owner Occupied"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {skipTraceData.occupancyStatus}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">
                    Estimated Equity
                  </Label>
                  <p className="text-lg font-bold text-green-600">
                    {formatCurrency(skipTraceData.equityEstimate)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Alert className="border-orange-200 bg-orange-50">
          <Info className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Demo Data:</strong> This information is generated for
            demonstration purposes. Real skip trace data would come from
            licensed data providers and must be used in compliance with
            applicable laws and regulations.
          </AlertDescription>
        </Alert>

        {/* Email Modal */}
        <Dialog open={showEmailModal} onOpenChange={setShowEmailModal}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Send className="h-5 w-5 text-primary" />
                Email Expired Listing Owner
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="email-to">To:</Label>
                <Input
                  id="email-to"
                  value={selectedEmail}
                  disabled
                  className="mt-1"
                />
              </div>

              {selectedListing && skipTraceData && (
                <div>
                  <div className="mb-2">
                    <Label>Email Preview:</Label>
                    <div className="mt-1 p-3 bg-gray-50 rounded border text-sm">
                      <div className="font-semibold mb-2">
                        Subject:{" "}
                        {
                          getExpiredListingEmailTemplate(
                            selectedListing,
                            skipTraceData
                          ).subject
                        }
                      </div>
                      <div className="whitespace-pre-wrap text-xs text-gray-600 max-h-32 overflow-y-auto">
                        {getExpiredListingEmailTemplate(
                          selectedListing,
                          skipTraceData
                        ).body.substring(0, 400)}
                        ...
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="custom-message">
                      Custom Message (optional):
                    </Label>
                    <Textarea
                      id="custom-message"
                      placeholder="Override the template with your custom message..."
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      className="mt-1 min-h-[120px]"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Leave empty to use the personalized template above, or
                      write a custom message
                    </p>
                  </div>
                </div>
              )}

              <Alert className="border-blue-200 bg-blue-50">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>Professional Template:</strong> This email uses
                  property details and MLS data to create a persuasive message
                  encouraging the expired listing owner to relist with you.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowEmailModal(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSendEmail} disabled={sendingEmail}>
                  {sendingEmail ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </div>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Email
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-6 w-6 text-primary" />
            Expired Listings Search
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Find expired listings in your target area with complete property and
            owner details
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {!showResults ? (
            <>
              {/* Search Form */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="zipcode" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    ZIP Code
                  </Label>
                  <Input
                    id="zipcode"
                    type="text"
                    placeholder="33101"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="mt-1"
                    maxLength={5}
                  />
                </div>

                <div>
                  <Label htmlFor="daysback" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Days Back
                  </Label>
                  <Input
                    id="daysback"
                    type="number"
                    placeholder="30"
                    value={daysBack}
                    onChange={(e) => setDaysBack(e.target.value)}
                    className="mt-1"
                    min="1"
                    max="3650"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter number of days (1-3650)
                  </p>
                </div>

                <div>
                  <Label
                    htmlFor="mlsstatus"
                    className="flex items-center gap-2"
                  >
                    <Building className="h-4 w-4" />
                    MLS Status
                  </Label>
                  <Select value={mlsStatus} onValueChange={setMlsStatus}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="expired">Expired</SelectItem>
                      <SelectItem value="withdrawn">Withdrawn</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="all_off_market">
                        All Off-Market
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Alert className="border-blue-200 bg-blue-50">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>Demo Mode:</strong> This tool shows sample expired
                  listings data. In production, this would connect to MLS
                  databases and skip trace services for authentic property and
                  owner information.
                </AlertDescription>
              </Alert>

              <Button
                onClick={handleSearch}
                disabled={
                  !zipCode.trim() ||
                  !daysBack ||
                  !mlsStatus ||
                  loading ||
                  parseInt(daysBack) < 1
                }
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Searching Expired Listings...
                  </div>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Search Expired Listings
                  </>
                )}
              </Button>
            </>
          ) : (
            <>
              {/* Results */}
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">
                      Expired Listings Results
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Found {expiredListings.length} expired listings in{" "}
                      {zipCode} from the last {daysBack} days
                    </p>
                  </div>
                  <Button variant="outline" onClick={resetCalculator}>
                    New Search
                  </Button>
                </div>

                {/* Results Grid */}
                <div className="grid gap-4">
                  {expiredListings.map((listing) => (
                    <Card
                      key={listing.id}
                      className="border-2 hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Home className="h-8 w-8 text-gray-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-lg font-semibold">
                                  {listing.address}
                                </h4>
                                <Badge variant="outline">
                                  {listing.mlsNumber}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {listing.city}, {listing.state}{" "}
                                {listing.zipCode}
                              </p>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>{listing.bedrooms} BR</span>
                                <span>{listing.bathrooms} BA</span>
                                <span>
                                  {listing.sqft.toLocaleString()} sqft
                                </span>
                                <span>Built {listing.yearBuilt}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="mb-2">
                              <p className="text-sm text-muted-foreground">
                                Last Price
                              </p>
                              <p className="text-xl font-bold text-blue-600">
                                {formatCurrency(listing.lastPrice)}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              <Badge variant="secondary" className="text-xs">
                                <Clock className="h-3 w-3 mr-1" />
                                {listing.daysOnMarket} DOM
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Expired {listing.expiredDate}
                              </Badge>
                            </div>
                            <Button
                              onClick={() => handleGetDetails(listing)}
                              disabled={loading}
                              size="sm"
                              className="w-full"
                            >
                              {loading ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <>
                                  <Eye className="h-4 w-4 mr-1" />
                                  Get Details
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
