import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-background/80">
      <div className="container px-4 md:px-6 flex flex-col items-center max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-6 text-center">
          Privacy Policy
        </h1>
        <p className="text-lg text-muted-foreground mb-8 text-center max-w-3xl">
          Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your information.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Information We Collect</h3>
              <p className="text-sm text-muted-foreground">
                We collect personal and contract-related data to enhance our AI analysis and improve your experience.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">How We Use Your Data</h3>
              <p className="text-sm text-muted-foreground">
                Your data is processed securely to provide AI-powered contract insights without unauthorized access.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Data Protection</h3>
              <p className="text-sm text-muted-foreground">
                We implement industry-standard security measures to protect your data from breaches and unauthorized access.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Your Rights</h3>
              <p className="text-sm text-muted-foreground">
                You can access, update, or request the deletion of your data in compliance with privacy laws.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10">
          <Link href="/">
            <Button size="lg" variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
