import { cn } from "@/lib/utils";
import {
  ArrowRight,
  FileSearch,
  Globe,
  Hourglass,
  PiggyBank,
  Scale,
  ShieldCheck,
  Sparkles,
  Zap,
  Star
} from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { PricingSection } from "./pricing-section";
import { useEffect, useState } from "react";

const reviews = [
  {
    name: "Sarah Johnson",
    role: "Legal Consultant",
    feedback: "This AI-powered contract analysis tool has saved me countless hours. Highly recommend!",
    rating: 5,
  },
  {
    name: "Mark Thompson",
    role: "Business Owner",
    feedback: "Incredible accuracy in identifying risks and opportunities. It’s now an essential part of our workflow!",
    rating: 4,
  },
  {
    name: "Emily Carter",
    role: "Corporate Lawyer",
    feedback: "A must-have tool for legal professionals. Saves time and improves contract accuracy!",
    rating: 5,
  },
  {
    name: "Johan Farnandis",
    role: "Manager",
    feedback: "A must-have tool for legal professionals. Saves time and improves contract accuracy!",
    rating: 5,
  },
  {
    name: "Willim Shakspear",
    role: "Advocate",
    feedback: "A must-have tool for legal professionals. Saves time and improves contract accuracy!",
    rating: 3,
  },
  {
    name: "Alex Wex",
    role: "Lawyer",
    feedback: "A must-have tool for legal professionals. Saves time and improves contract accuracy!",
    rating: 4.5,
  },
 
];

const features = [
  {
    title: "AI-powered Analysis",
    description:
      "Leverage advanced AI to analyze contracts quickly and accurately.",
    icon: FileSearch,
  },
  {
    title: "Risk Identification",
    description: "Spot potential risks and opportunities in your contracts.",
    icon: ShieldCheck,
  },
  {
    title: "Streamlined Negotiation",
    description: "Accelerate the negotiation process with AI-driven insights.",
    icon: Hourglass,
  },
  {
    title: "Cost Reduction",
    description: "Significantly reduce legal costs through automation.",
    icon: PiggyBank,
  },
  {
    title: "Improved Compliance",
    description: "Ensure your contracts meet all regulatory requirements.",
    icon: Scale,
  },
  {
    title: "Faster Turnaround",
    description: "Complete contract reviews in minutes instead of hours.",
    icon: Zap,
  },
];

export function HeroSection() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Track hydration status

  useEffect(() => {
    setIsMounted(true); // Ensure it's only modified after mount

    const checkAdmin = async () => {
      try {
        const response = await fetch('/api/check-admin');
        const data = await response.json();
        setIsAdmin(data.isAdmin);
      } catch (error) {
        console.error("Error checking admin status", error);
      }
    };

    checkAdmin();
  }, []);

  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-background/80">
        <div className="container px-4 md:px-6 flex flex-col items-center max-w-6xl mx-auto">
          <Link
            href={"/dashboard"}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "px-4 py-2 mb-4 rounded-full hidden md:flex"
            )}
          >
            <span className="mr-3 hidden md:block">
              <Sparkles className="size-3.5" />
            </span>
            Introducing Simple Metrics for your team
          </Link>
          <div className="text-center mb-12 w-full">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-4">
              Revoltionzie Your Contracts
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Harness the power of AI to analyze, understand, and optimize your
              contracts in no time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                className="inline-flex items-center justify-center text-lg"
                size={"lg"}
              >
                Get Started
                <ArrowRight className="ml-2 size-5" />
              </Button>
              <Button
                className="inline-flex items-center justify-center text-lg"
                size={"lg"}
                variant={"outline"}
              >
                Learn More
                <Globe className="ml-2 size-5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-12">
              {features.map((feature) => (
                <Card key={feature.title} className="h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/*  */}
            <div className="container px-6 md:px-12 py-16 text-center">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-10">
                What Our Clients Say
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.map((review, index) => (
                  <Card
                    key={index}
                    className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                  >
                    <CardContent className="flex flex-col items-center text-center">
                      {/* Star Ratings */}
                      <div className="flex gap-1 text-yellow-400 mb-3">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="size-6" />
                        ))}
                      </div>

                      {/* Feedback Text */}
                      <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                        "{review.feedback}"
                      </p>

                      {/* Client Name & Role */}
                      <div className="mt-6">
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{review.name}</p>
                        <p className="text-gray-500 text-sm">{review.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <PricingSection />
            </div>

            {/*  */}
          </div>
        </div>
      </section>
      {/*  */}
      <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
        <div className="container px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
          <div className="text-lg font-semibold">© 2024 AI Contracts. All rights reserved.</div>
          <nav className="flex flex-wrap gap-4 mt-4 md:mt-0">
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/services" className="hover:text-white">Services</Link>
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}