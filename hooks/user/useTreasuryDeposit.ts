// // useTreasuryDeposit.ts
// import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
// import { useState, useCallback } from "react";
// import { Address, Hash } from "viem";
// import * as MockTreasury from "../../lib/abis/MockTreasury.json";
// import * as IERC20 from "../../lib/abis/IERC20.json";

// interface UseTreasuryDepositParams {
//   treasuryAddress: Address;
//   token: Address;
//   amount: bigint;
// }

// export const useTreasuryDeposit = ({
//   treasuryAddress,
//   token,
//   amount,
// }: UseTreasuryDepositParams) => {
//   const [approveHash, setApproveHash] = useState<Hash | undefined>();
//   const [depositHash, setDepositHash] = useState<Hash | undefined>();

//   const { writeContract: writeApprove, isPending: isApproveWritePending } =
//     useWriteContract();
//   const { writeContract: writeDeposit, isPending: isDepositWritePending } =
//     useWriteContract();

//   const {
//     isLoading: isApproveLoading,
//     isSuccess: isApproveSuccess,
//     error: approveError,
//   } = useWaitForTransactionReceipt({
//     hash: approveHash,
//   });

//   const {
//     isLoading: isDepositLoading,
//     isSuccess: isDepositSuccess,
//     error: depositError,
//   } = useWaitForTransactionReceipt({
//     hash: depositHash,
//   });

//   const deposit = useCallback(async () => {
//     try {
//       // First approve tokens
//       const approveResult = await writeApprove({
//         address: token,
//         abi: IERC20.abi,
//         functionName: "approve",
//         args: [treasuryAddress, amount],
//       });
//       if (approveResult) {
//         setApproveHash(approveResult);
//       }

//       // Wait for approval to be mined
//       await new Promise((resolve) => {
//         const interval = setInterval(() => {
//           if (isApproveSuccess) {
//             clearInterval(interval);
//             resolve(true);
//           }
//         }, 1000);
//       });

//       // Then deposit
//       const depositResult = await writeDeposit({
//         address: treasuryAddress,
//         abi: MockTreasury,
//         functionName: "deposit",
//         args: [token, amount],
//       });
//       if (depositResult) {
//         setDepositHash(depositResult);
//       }
//     } catch (error) {
//       console.error("Deposit error:", error);
//       throw error;
//     }
//   }, [
//     writeApprove,
//     writeDeposit,
//     token,
//     treasuryAddress,
//     amount,
//     isApproveSuccess,
//   ]);

//   return {
//     deposit,
//     isLoading:
//       isApproveWritePending ||
//       isApproveLoading ||
//       isDepositWritePending ||
//       isDepositLoading,
//     isSuccess: isDepositSuccess,
//     error: approveError || depositError,
//   };
// };
