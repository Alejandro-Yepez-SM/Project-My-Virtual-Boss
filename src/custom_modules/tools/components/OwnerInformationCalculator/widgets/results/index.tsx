import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Building,
  Calendar,
  Clock,
  Info,
  Mail,
  Phone,
  Send,
  User,
} from "lucide-react";
import { formatCurrency } from "../../helpers";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { IOwnerInfo, IProperty } from "../../interfaces";
import { useState } from "react";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const OwnerResults = ({
  ownerInfo,
  propertyResuls,

  setShowResults,
}: {
  ownerInfo: IOwnerInfo;

  propertyResuls: IProperty;
  setShowResults: (param: boolean) => void;
}) => {
  const [address, setAddress] = useState<string>("");

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<string>("");

  const resetCalculator = () => {
    setAddress("");
    setShowResults(false);
    //setOwnerInfo(null);
  };

  const openEmailModal = (email: string) => {
    setSelectedEmail(email);
    setShowEmailModal(true);
  };

  if (ownerInfo) {
    return (
      <>
        {/* Results */}
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">Owner Information Results</h3>
              <p className="text-sm text-muted-foreground">{address}</p>
            </div>
            <Button variant="outline" onClick={resetCalculator}>
              New Search
            </Button>
          </div>

          {/* Owner Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-purple-600" />
                Owner Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm text-muted-foreground">
                  Primary Owner
                </Label>
                <p className="font-semibold text-lg">{ownerInfo.fullName}</p>
                {/*   {ownerInfo.coOwnerName && (
                  <>
                    <Label className="text-sm text-muted-foreground">
                      Co-Owner
                    </Label>
                    <p className="font-semibold">{ownerInfo.coOwnerName}</p>
                  </>
                )} */}
              </div>

              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">
                  Phone Numbers
                </Label>
                <div className="space-y-2">
                  {ownerInfo.phones?.map((phone, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">{phone.phone}</span>
                        <Badge variant="outline" className="text-xs">
                          {phone.phoneDisplay}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        {/*   <Badge
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
                        )} */}
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
                  {ownerInfo.email?.map((email, index) => (
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
                          {email.emailType}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* <Badge
                          variant={
                            email.confidence === "High"
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {email.confidence}
                        </Badge> */}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEmailModal(email.email ?? "")}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <Label className="text-sm text-muted-foreground">
                    Mailing Address
                  </Label>
                  <p className="font-medium">{ownerInfo.mailAddress.address}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">
                    Property Type
                  </Label>
                  <Badge variant="outline">{propertyResuls.propertyType}</Badge>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">
                    Occupancy Status
                  </Label>
                  {/*  <Badge
                    variant={
                      propertyResuls.vacant === "Owner Occupied"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {ownerInfo.occupancyStatus}
                  </Badge> */}
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">
                    Estimated Property Value
                  </Label>
                  <p className="font-semibold text-blue-600">
                    {formatCurrency(propertyResuls.estimatedValue)}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-muted-foreground">
                    Estimated Equity
                  </Label>
                  <p className="text-lg font-bold text-green-600">
                    {formatCurrency(propertyResuls.estimatedEquity)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* MLS Listing History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-blue-600" />
                MLS Listing History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {propertyResuls.mlsHistory.length > 0 ? (
                <div className="space-y-4">
                  {propertyResuls.mlsHistory.map((listing, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg bg-gray-50"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              listing.type === "For Sale"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {listing.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {listing.propertyId}
                          </Badge>
                          <Badge
                            variant={
                              listing.status === "Sold" ||
                              listing.status === "Leased"
                                ? "default"
                                : "destructive"
                            }
                            className="text-xs"
                          >
                            {listing.status}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-lg">
                            {listing.type === "For Rent"
                              ? `${formatCurrency(listing.price)}/mo`
                              : formatCurrency(listing.price)}
                          </p>
                          {listing.price && (
                            <p className="text-sm text-green-600 font-medium">
                              Final:{" "}
                              {listing.type === "For Rent"
                                ? `${formatCurrency(listing.price)}/mo`
                                : formatCurrency(listing.price)}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <Label className="text-xs text-muted-foreground">
                            Listed Date
                          </Label>
                          <p className="font-medium flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {listing.lastStatusDate}
                          </p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">
                            End Date
                          </Label>
                          <p className="font-medium flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {listing.lastStatusDate}
                          </p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">
                            Days on Market
                          </Label>
                          <p className="font-medium flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {listing.daysOnMarket} days
                          </p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">
                            Listing Agent
                          </Label>
                          <p className="font-medium">{listing.agentName}</p>
                        </div>
                      </div>

                      <div className="mt-2 pt-2 border-t">
                        <Label className="text-xs text-muted-foreground">
                          Brokerage
                        </Label>
                        <p className="text-sm font-medium">
                          {listing.agentOffice}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Building className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No MLS listing history found for this property.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Email Modal */}
          <Dialog open={showEmailModal} onOpenChange={setShowEmailModal}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5 text-primary" />
                  Send Email to Owner
                </DialogTitle>
              </DialogHeader>

              {/* {ownerInfo && (
                <OwnerContactEmail
                  ownerInfo={ownerInfo}
                  address={address}
                  selectedEmail={selectedEmail}
                  setShowEmailModal={setShowEmailModal}
                />
              )} */}
            </DialogContent>
          </Dialog>
        </div>
      </>
    );
  }
};
