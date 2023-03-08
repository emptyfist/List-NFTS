import React, { useRef, useState } from "react";
import axios from "axios";
import { LoadingBlocksWave } from "../assets/loading";
import { useEffect } from "react";
export const formatterInt = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

const Details = ({ address, tokenId, onClose }) => {
  const isMounted = useRef(true);
  const [detail, setDetail] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      setLoading(true);
      let result = await axios
        .get(
          `https://eth-mainnet.g.alchemy.com/nft/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}/getNFTMetadata?contractAddress=${address}&tokenId=${tokenId}&refreshCache=false`
        )
        .then((res) => res.data)
        .catch((e) => null);

      console.log(result);
      setDetail(result);
      setLoading(false);
    };

    isMounted.current && getDetails();
    return () => (isMounted.current = false);

    // eslint-disable-next-line
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center backdrop-blur-sm">
      <div className="bg-[#242f4e] rounded-lg w-96 p-6 text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{`${
            detail?.contractMetadata?.name ?? ""
          } Details`}</h2>
          <button onClick={(e) => onClose()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500 hover:text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <LoadingBlocksWave width={60} height={60} />
          </div>
        ) : !detail ? (
          <div className="flex items-center justify-center h-full text-3xl font-bold">
            No Details
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="overflow-hidden rounded-2xl">
              <img
                className="w-full h-auto hover:scale-110 transition-all duration-500 cursor-pointer"
                src={detail.contractMetadata.openSea.imageUrl}
                alt={detail.contractMetadata.name}
              />
            </div>
            <span className="font-bold text-2xl pt-4">
              {`${detail.contractMetadata.name} #${+detail.id.tokenId}`}
            </span>
            <span className="text-md">{`BlockNumber : ${formatterInt.format(
              detail.contractMetadata.deployedBlockNumber
            )}`}</span>
            <span className="text-md">{`IngestedAt : ${detail.contractMetadata.openSea.lastIngestedAt}`}</span>
            <span className="whitespace-pre-wrap">
              {detail.contractMetadata.openSea.description}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
