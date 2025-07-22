// "use client";

// import ContractAnalysisResults from "@/components/analysis/contract-analysis-results";
// import { useCurrentUser } from "@/hooks/use-current-user";
// import { ContractAnalysis } from "@/interfaces/contract.interface";
// import { api } from "@/lib/api";
// import { notFound } from "next/navigation";
// import { useEffect, useState } from "react";

// interface IContractResultsProps {
//   contractId: string;
// }

// export default function ContractResults({ contractId }: IContractResultsProps) {
//   const { user } = useCurrentUser();
//   const [analysisResults, setAnalysisResults] = useState<ContractAnalysis>();
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<boolean>(false);

//   useEffect(() => {
//     if (user) {
//       fetchAnalysisResults(contractId);
//     }
//   }, [user]);

//   const fetchAnalysisResults = async (id: string) => {
//     try {
//       setLoading(true);
//       const response = await api.get(`/contracts/contract/${id}`);
//       const data = response.data;

//       // Validate analysisResults
//       if (
//         !data ||
//         isNaN(data.overallScore) ||
//         data.overallScore < 0 ||
//         data.overallScore > 100
//       ) {
//         throw new Error("Invalid analysis results data");
//       }

//       setAnalysisResults(data);
//       console.log(data);
//       setError(false);
//     } catch (error) {
//       console.error(error);
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (error) {
//     return notFound();
//   }

//   if (loading || !analysisResults) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <ContractAnalysisResults
//       contractId={contractId}
//       analysisResults={analysisResults}
//       isActive={true}
//       onUpgrade={function (): void {
//         throw new Error("Function not implemented.");
//       }}
//     />
//   );
// }




// ----------------------------------
"use client";

import ContractAnalysisResults from "@/components/analysis/contract-analysis-results";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ContractAnalysis } from "@/interfaces/contract.interface";
import { api } from "@/lib/api";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

interface IContractResultsProps {
  contractId?: string; // Ensure contractId is optional to prevent type errors
}

export default function ContractResults({ contractId }: IContractResultsProps) {
  const { user } = useCurrentUser();
  const [analysisResults, setAnalysisResults] = useState<ContractAnalysis | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (user && contractId) {
      fetchAnalysisResults(contractId);
    }
  }, [user, contractId]);

  const fetchAnalysisResults = async (id: string) => {
    try {
      setLoading(true);
      const response = await api.get(`/contracts/contract/${id}`);
      const data = response.data;

      // Validate analysisResults
      if (!data || isNaN(data.overallScore) || data.overallScore < 0 || data.overallScore > 100) {
        throw new Error("Invalid analysis results data");
      }

      setAnalysisResults(data);
      setError(false);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (error || !contractId) {
    return notFound();
  }

  if (loading || !analysisResults) {
    return <div>Loading...</div>;
  }

  return (
    <ContractAnalysisResults
    contractId={String(contractId)} // Ensure it's a string
    analysisResults={analysisResults}
    isActive={true}
    onUpgrade={() => {
      console.error("Upgrade function not implemented.");
    }}
  />

  );
}
