import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Mail } from "lucide-react"
import Link from "next/link"

export default function ApplicationSuccessPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container max-w-2xl">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-balance mb-4">Application Submitted!</h1>
              <p className="text-lg text-muted-foreground text-balance">
                Thank you for applying to join our network of technicians.
              </p>
            </div>

            <div className="bg-muted/50 p-6 rounded-lg mb-6 text-left">
              <h2 className="font-semibold mb-4">What happens next?</h2>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Review Process</p>
                    <p className="text-sm text-muted-foreground">
                      Our team will review your application within 2-3 business days.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Background Check</p>
                    <p className="text-sm text-muted-foreground">
                      We'll conduct a background verification to ensure customer safety.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Approval Notification</p>
                    <p className="text-sm text-muted-foreground">
                      You'll receive an email with your approval status and next steps.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button size="lg" asChild>
                <Link href="/">Return to Home</Link>
              </Button>
              <div>
                <p className="text-sm text-muted-foreground">
                  Questions? Contact us at{" "}
                  <a href="mailto:support@techfinder.com" className="text-primary hover:underline">
                    support@techfinder.com
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
