import { useEffect, useState } from "react";
import { Address, erc20Abi } from "viem";
import {
  useSendTransaction,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { arbitrum } from "wagmi/chains";

interface UseCrowdfundingDepositProps {
  vaultAddress: Address;
  tokenAddress: Address;
  amount: string;
  receiverAddress: Address;
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
