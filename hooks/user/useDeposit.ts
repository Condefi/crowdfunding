import { useEffect, useState } from "react";
import { Address, erc20Abi } from "viem";
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { arbitrum } from "wagmi/chains";
import * as MockTreasuryFactory from "../../lib/abis/MockTreasuryFactory.json";
import { factories, usdc } from "../../lib/clients/treasury-factory";

interface UseCrowdfundingDepositProps {
  vaultAddress: Address;
  tokenAddress: Address;
  amount: string;
  receiverAddress: Address;
}

interface UseTreasuryCreationProps {
  minInvestment: bigint;
  endDate: bigint;
  chainId: number;
}

export function useCrowdfundingDeposit({
  vaultAddress,
  tokenAddress,
  amount,
  receiverAddress,
}: UseCrowdfundingDepositProps) {
  const [allowanceHash, setAllowanceHash] = useState<
    `0x${string}` | undefined
  >();
  const [depositHash, setDepositHash] = useState<`0x${string}` | undefined>();
  const [isWaitingForAllowance, setIsWaitingForAllowance] = useState(false);
  const [isWaitingForDeposit, setIsWaitingForDeposit] = useState(false);

  const { sendTransactionAsync } = useSendTransaction();
  const { writeContractAsync } = useWriteContract();

  const { data: allowanceReceipt } = useWaitForTransactionReceipt({
    hash: allowanceHash,
  });

  const { data: depositReceipt } = useWaitForTransactionReceipt({
    hash: depositHash,
  });

  useEffect(() => {
    if (isWaitingForAllowance && allowanceReceipt) {
      handleDeposit();
      setIsWaitingForAllowance(false);
      setAllowanceHash(undefined);
    }
  }, [allowanceReceipt, isWaitingForAllowance]);

  useEffect(() => {
    if (isWaitingForDeposit && depositReceipt) {
      setIsWaitingForDeposit(false);
      setDepositHash(undefined);
    }
  }, [depositReceipt, isWaitingForDeposit]);

  const handleAllowance = async () => {
    try {
      const allowance = await writeContractAsync({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "approve",
        chain: arbitrum,
        account: receiverAddress,
        args: [vaultAddress, BigInt(amount)],
      });

      setAllowanceHash(allowance);
      setIsWaitingForAllowance(true);
    } catch (error) {
      console.error("Approval failed:", error);
      setIsWaitingForAllowance(false);
      setAllowanceHash(undefined);
      throw error;
    }
  };

  const handleDeposit = async () => {
    try {
      const hash = await sendTransactionAsync({
        to: vaultAddress,
        data: "0x", // Empty data for simple transfer
        value: BigInt(amount),
      });
      setDepositHash(hash);
      setIsWaitingForDeposit(true);
    } catch (error) {
      console.error("Deposit failed:", error);
      setIsWaitingForDeposit(false);
      setDepositHash(undefined);
      throw error;
    }
  };

  return {
    handleAllowance,
    handleDeposit,
    isWaitingForAllowance,
    isWaitingForDeposit,
    allowanceReceipt,
    depositReceipt,
  };
}

export function useTreasuryCreation({
  minInvestment,
  endDate,
  chainId,
}: UseTreasuryCreationProps) {
  const [approvalHash, setApprovalHash] = useState<Address | undefined>();
  const [treasuryHash, setTreasuryHash] = useState<Address | undefined>();
  const [isWaitingForApproval, setIsWaitingForApproval] = useState(false);
  const [isWaitingForTreasury, setIsWaitingForTreasury] = useState(false);
  const { address } = useAccount();

  const { writeContractAsync } = useWriteContract();

  const { data: approvalReceipt } = useWaitForTransactionReceipt({
    hash: approvalHash,
  });

  const { data: treasuryReceipt } = useWaitForTransactionReceipt({
    hash: treasuryHash,
  });

  useEffect(() => {
    if (isWaitingForApproval && approvalReceipt) {
      handleCreateTreasury();
      setIsWaitingForApproval(false);
      setApprovalHash(undefined);
    }
  }, [approvalReceipt, isWaitingForApproval]);

  const handleApproval = async () => {
    try {
      const approvalAmount = BigInt(2) * BigInt(minInvestment);

      if (!factories[chainId] || !usdc[chainId]) {
        throw new Error("Invalid chain ID or missing contract addresses");
      }

      const approval = await writeContractAsync({
        abi: erc20Abi,
        address: usdc[chainId] as Address,
        functionName: "approve",
        args: [address as Address, approvalAmount],
      });

      setApprovalHash(approval);
      setIsWaitingForApproval(true);
    } catch (error) {
      console.error("Approval failed:", error);
      setIsWaitingForApproval(false);
      setApprovalHash(undefined);
      throw error;
    }
  };

  const handleCreateTreasury = async () => {
    try {
      const treasury = await writeContractAsync({
        abi: MockTreasuryFactory,
        address: factories[chainId],
        functionName: "createTreasury",
        args: [minInvestment, endDate, [usdc[chainId]], usdc, minInvestment],
      });

      setTreasuryHash(treasury);
      setIsWaitingForTreasury(true);
    } catch (error) {
      console.error("Treasury creation failed:", error);
      setIsWaitingForTreasury(false);
      setTreasuryHash(undefined);
      throw error;
    }
  };

  return {
    handleApproval,
    isWaitingForApproval,
    isWaitingForTreasury,
    approvalReceipt,
    treasuryReceipt,
  };
}
