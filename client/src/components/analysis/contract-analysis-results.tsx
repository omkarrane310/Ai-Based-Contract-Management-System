import React, { useState, useEffect } from "react";
import OverallScoreChart from "./chart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui/accordion";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

interface IContractAnalysisResultsProps {
  analysisResults: any;
  isActive: boolean;
  onUpgrade: () => void;
}

export default function ContractAnalysisResults({
  analysisResults,
  isActive,
  onUpgrade,
}: IContractAnalysisResultsProps) {
  const [activeTab, setActiveTab] = useState("summary");
  const [isClient, setIsClient] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  // const handleAskQuestion = async () => {
  //   try {
  //     const response = await fetch("/api/ask-ai", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ question: "What is the overall score of the contract?" }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     setAnswer(data.answer);
  //   } catch (error) {
  //     console.error("Error fetching AI response:", error);
  //     setAnswer("Sorry, there was an error processing your question.");
  //   }
  // };
  const handleAskQuestion = async () => {
    setAnswer("Loading...");
    try {
      const response = await fetch("/api/ask-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Failed to get an answer.");
      }
  
      setAnswer(data.answer || "No answer provided.");
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setAnswer("Sorry, there was an error processing your question.");
    }
  };
  

  if (!analysisResults) {
    return <div>No results</div>;
  }

  console.log("Analysis Results:", analysisResults);

  const getScore = () => {
    const score = analysisResults.overallScore;
    if (score > 70)
      return { icon: ArrowUp, color: "text-green-500", text: "Good" };
    if (score < 50)
      return { icon: ArrowDown, color: "text-red-500", text: "Bad" };
    return { icon: Minus, color: "text-yellow-500", text: "Average" };
  };

  const scoreTrend = getScore();

  const renderRisksAndOpportunities = (items: any[], type: string) => {
    return (
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex flex-col items-start">
            <span className="font-semibold">{type === "risks" ? item.risk : item.opportunity}</span>
            <span className="text-sm text-gray-600">{item.explanation}</span>
            <span className={`text-sm ${item.severity === "high" ? "text-red-500" : item.severity === "medium" ? "text-yellow-500" : "text-green-500"}`}>
              Severity: {item.severity}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Analysis Results</h1>
        <div className="flex space-x-2">{/* ASK AI BUTTON */}</div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Overall Contract Score</CardTitle>
          <CardDescription>
            Based on risks and opportunities identified
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="w-1/2">
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-4xl font-bold">
                  {analysisResults.overallScore ?? 0}
                </div>
                <div className={`flex items-center ${scoreTrend.color}`}>
                  <scoreTrend.icon className="size-6 mr-1" />
                  <span className="font-semibold">{scoreTrend.text}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Risk</span>
                  <span>{100 - analysisResults.overallScore}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Opportunities</span>
                  <span>{analysisResults.overallScore}%</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                This score represents the overall risks and opportunities
                identified in the contract.
              </p>
            </div>

            <div className="w-1/2 h-48 flex justify-center items-center">
              <div className="w-full h-full max-w-xs">
                {isClient && (
                  <OverallScoreChart
                    overallScore={analysisResults.overallScore}
                  />
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="risks">Risks</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="qna">Q&A</TabsTrigger>
        </TabsList>
        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>Contract Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">
                {analysisResults.summary}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="risks">
          <Card>
            <CardHeader>
              <CardTitle>Risks</CardTitle>
            </CardHeader>
            <CardContent>
              {renderRisksAndOpportunities(analysisResults.risks, "risks")}
              {!isActive && (
                <p className="mt-4 text-center text-sm text-gray-500">
                  Upgrade to Premium to see all risks
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="opportunities">
          <Card>
            <CardHeader>
              <CardTitle>Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              {renderRisksAndOpportunities(
                analysisResults.opportunities,
                "opportunities"
              )}
              {!isActive && (
                <p className="mt-4 text-center text-sm text-gray-500">
                  Upgrade to Premium to see all opportunities
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="details">
          {isActive ? (
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contract Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysisResults.keyClauses?.map((keyClause: string, index: number) => (
                      <motion.li key={`${keyClause}-${index}`} className="flex items-center">
                        {keyClause}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysisResults.recommendations?.map(
                      (recommendation: string, index: number) => (
                        <motion.li key={index} className="flex items-center">
                          {recommendation}
                        </motion.li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Contract Details</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Upgrade to Premium to see contract detailed analysis,
                  including key clauses and recommendations.
                </p>
                <Button
                  variant={"outline"}
                  onClick={onUpgrade}
                  className="mt-4"
                >
                  Upgrade to Premium
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="qna">
          <Card>
            <CardHeader>
              <CardTitle>Ask a Question</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask your question here..."
                  className="w-full p-2 border rounded"
                />
                <Button onClick={handleAskQuestion}>Ask AI</Button>
                {answer && (
                  <div className="mt-4 p-4 border rounded bg-gray-100">
                    <strong>Answer:</strong>
                    <p>{answer}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Accordion type="single" collapsible className="mb-6">
        <AccordionItem value="contract-details">
          <AccordionTrigger>Contract Details</AccordionTrigger>
          <AccordionContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">
                  Duration and Termination
                </h3>
                <p>{analysisResults.contractDuration}</p>
                <strong>Termination Conditions</strong>
                <p>{analysisResults.terminationConditions}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Legal Information</h3>
                <p>
                  <strong>Legal Compliance</strong>
                  {analysisResults.legalCompliance}
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Card>
        <CardHeader>
          <CardTitle>Negotiation Points</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid md:grid-cols-2 gap-2">
            {analysisResults?.negotiationPoints?.map((point: string, index: number) => (
              <li className="flex items-center" key={index}>
                {point}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}