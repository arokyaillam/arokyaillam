import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";

export const metadata = {
  title: "Donate | AROKYA ILLAM CHARITABLE TRUST",
  description: "Support our mission to provide healthcare and support for persons with disability across India.",
};

export default function DonatePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Support Our Mission</h1>
          <p className="text-xl text-muted-foreground">
            Your contribution helps us provide healthcare and support for persons with disability across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="mr-2 h-5 w-5 text-primary" />
                One-time Donation
              </CardTitle>
              <CardDescription>
                Make an immediate impact with a one-time contribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Your donation will directly support our programs providing healthcare, assistive devices, 
                and support services to persons with disability.
              </p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {["₹500", "₹1,000", "₹5,000"].map((amount) => (
                  <Button key={amount} variant="outline" className="w-full">
                    {amount}
                  </Button>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Donate Now</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="mr-2 h-5 w-5 text-primary" />
                Monthly Giving
              </CardTitle>
              <CardDescription>
                Provide sustained support with a monthly donation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Become a monthly donor to help us plan and implement long-term programs
                that create lasting change for persons with disability.
              </p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {["₹200/mo", "₹500/mo", "₹1,000/mo"].map((amount) => (
                  <Button key={amount} variant="outline" className="w-full">
                    {amount}
                  </Button>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Become a Monthly Donor</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="bg-muted p-6 rounded-lg mb-12">
          <h2 className="text-2xl font-bold mb-4">Other Ways to Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Corporate Partnerships</h3>
              <p className="text-muted-foreground mb-4">
                Partner with us for CSR initiatives or employee engagement programs.
              </p>
              <Button variant="outline">Contact for Partnerships</Button>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">In-kind Donations</h3>
              <p className="text-muted-foreground mb-4">
                Donate medical equipment, assistive devices, or other needed supplies.
              </p>
              <Button variant="outline">Learn More</Button>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your Donation Makes a Difference</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-4">
              <div className="text-4xl font-bold text-primary mb-2">₹500</div>
              <p className="text-muted-foreground">
                Provides basic medical supplies for one person
              </p>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-primary mb-2">₹5,000</div>
              <p className="text-muted-foreground">
                Funds a mobility aid like a wheelchair or crutches
              </p>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-primary mb-2">₹10,000</div>
              <p className="text-muted-foreground">
                Supports a medical camp serving dozens of people
              </p>
            </div>
          </div>
          <p className="text-muted-foreground">
            AROKYA ILLAM CHARITABLE TRUST is a registered non-profit organization. 
            All donations are tax-deductible as allowed by law.
          </p>
        </div>
      </div>
    </div>
  );
}