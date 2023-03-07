import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Header } from ".";
import { LoadingBlocksWave } from "../assets/loading";

const Layout = () => {
  const { isLoading, isError, data } = useQuery(["nfts"], () =>
    axios
      .get(
        "https://eth-mainnet.g.alchemy.com/nft/v2/EozffglF6aVud6qppVzowt8F5VUOJuUx/getNFTs?owner=vitalik.eth&withMetadata=false&pageSize=100"
      )
      .then((res) => res.data)
  );

  console.log(isLoading);
  console.log(isError);
  console.log(data);

  return (
    <div className="layout-wrapper w-screen h-screen bg-[linear-gradient(180deg,#1a2238,#070d1d)] overflow-hidden">
      <Header />
      <div className="list-wrapper p-12 w-full h-[calc(100%_-_80px)]">
        <div className="container mx-auto w-full h-full rounded-3xl bg-[rgba(36,47,78,.4)] shadow-[0_2px_12px_rgba(57,71,108,.5)] overflow-x-hidden overflow-y-auto">
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <LoadingBlocksWave width={60} height={60} />
            </div>
          )}
          {isError && (
            <div className="flex items-center justify-center h-full">
              <span>Can't get NFT data</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
