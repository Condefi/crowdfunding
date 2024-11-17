// // useTreasuryDeploy.ts
// import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
// import { useState, useCallback } from "react";
// import { Address, Hash } from "viem";
// import * as MockTreasuryFactory from "../../lib/abis/MockTreasuryFactory.json";
// import * as IERC20 from "../../lib/abis/IERC20.json";

// interface UseTreasuryDeployParams {
//   factoryAddress: Address;
//   minimumAmount: bigint;
//   deadline: bigint;
//   whitelistedTokens: Address[];
//   depositToken: Address;
//   depositAmount: bigint;
// }

// export const useTreasuryDeploy = ({
//   factoryAddress,
//   minimumAmount,
//   deadline,
//   whitelistedTokens,
//   depositToken,
//   depositAmount,
// }: UseTreasuryDeployParams) => {
//   const [approveHash, setApproveHash] = useState<Hash | undefined>();
//   const [deployHash, setDeployHash] = useState<Hash | undefined>();
//   const [deployedAddress, setDeployedAddress] = useState<Address | null>(null);

//   const { writeContract: writeApprove, isPending: isApproveWritePending } =
//     useWriteContract();
//   const { writeContract: writeDeploy, isPending: isDeployWritePending } =
//     useWriteContract();

//   const {
//     isLoading: isApproveLoading,
//     isSuccess: isApproveSuccess,
//     error: approveError,
//   } = useWaitForTransactionReceipt({
//     hash: approveHash,
//   });

//   const {
//     isLoading: isDeployLoading,
//     isSuccess: isDeploySuccess,
//     error: deployError,
//     data: deployReceipt,
//   } = useWaitForTransactionReceipt({
//     hash: deployHash,
//     onSuccess: (data) => {
//       // Extract treasury address from event logs
//       const event = data.logs.find(
//         (log) => log.topics[0] === getTreasuryCreatedEventId()
//       );
//       if (event && event.topics[1]) {
//         setDeployedAddress(event.topics[1] as Address);
//       }
//     },
//   });

//   const getTreasuryCreatedEventId = () => {
//     const event = (MockTreasuryFactory as any).abi.find(
//       (x: any) => x.type === "event" && x.name === "TreasuryCreated"
//     );
//     return event?.id;
//   };

//   const deployTreasury = useCallback(async () => {
//     try {
//       // First approve tokens
//       const approveResult = await writeApprove({
//         address: depositToken,
//         abi: IERC20.abi,
//         functionName: "approve",
//         args: [factoryAddress, depositAmount],
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

//       // Then deploy treasury
//       const deployResult = await writeDeploy({
//         address: factoryAddress,
//         abi: MockTreasuryFactory.abi,
//         functionName: "createTreasury",
//         args: [
//           minimumAmount,
//           deadline,
//           whitelistedTokens,
//           depositToken,
//           depositAmount,
//         ],
//       });
//       if (deployResult) {
//         setDeployHash(deployResult);
//       }
//     } catch (error) {
//       console.error("Deployment error:", error);
//       throw error;
//     }
//   }, [
//     writeApprove,
//     writeDeploy,
//     factoryAddress,
//     minimumAmount,
//     deadline,
//     whitelistedTokens,
//     depositToken,
//     depositAmount,
//     isApproveSuccess,
//   ]);

//   return {
//     deployTreasury,
//     deployedAddress,
//     isLoading:
//       isApproveWritePending ||
//       isApproveLoading ||
//       isDeployWritePending ||
//       isDeployLoading,
//     isSuccess: isDeploySuccess,
//     error: approveError || deployError,
//   };
// };
