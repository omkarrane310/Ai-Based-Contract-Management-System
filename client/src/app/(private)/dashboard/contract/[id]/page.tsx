"use client";

import React from "react";
import ContractResults from "./_components/contract-results";

interface IContractResultsProps {
  params: Promise<{ id: string }>;
}

export default function ContractPage({ params }: IContractResultsProps) {
  const { id } = React.use(params); // Unwrap the promise using React.use()

  return <ContractResults contractId={id} />;
}
