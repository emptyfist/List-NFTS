import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Details, Header, NFTCard } from ".";
import { LoadingBlocksWave } from "../assets/loading";

const Layout = () => {
  const inputRef = useRef(null);
  const isMounted = useRef(true);

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [detailInfo, setDetailInfo] = useState({
    isOpen: false,
    address: null,
    tokenId: null,
  });

  useEffect(() => {
    isMounted.current && getNfts("vitalik.eth");
    return () => (isMounted.current = false);
  }, []);

  const getNfts = async (owner) => {
    setLoading(true);
    let result = await axios
      .get(
        `https://eth-mainnet.g.alchemy.com/nft/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}/getNFTs?owner=${owner}&withMetadata=true&pageSize=100`
      )
      .then((res) => res.data)
      .catch((e) => []);

    if (result?.ownedNfts?.length > 0) setData(result.ownedNfts);
    else setData([]);

    setLoading(false);
  };

  const openPopupDialog = (address, tokenId) => {
    setDetailInfo({ isOpen: true, address, tokenId });
  };

  const closePopupDialog = () => {
    setDetailInfo({ isOpen: false, address: null, tokenId: null });
  };

  const addressChanged = (e) => {
    if (e.keyCode !== 13) return;
    getNfts(inputRef.current.value);
  };

  return (
    <div className="layout-wrapper w-screen h-screen bg-[linear-gradient(180deg,#1a2238,#070d1d)] overflow-hidden">
      <Header />
      <div className="list-wrapper p-12 w-full h-[calc(100%_-_80px)]">
        <div className="container mx-auto w-full h-full rounded-3xl bg-[rgba(36,47,78,.4)] shadow-[0_2px_12px_rgba(57,71,108,.5)] p-4">
          <div className="flex items-center p-2">
            <span className="text-white font-bold text-xl">
              Input owner address as ENS format :{" "}
            </span>
            <input
              className="mx-2 px-2 h-[32px] w-[420px] rounded"
              ref={inputRef}
              placeholder="Eg: 0xshah.eth"
              defaultValue="vitalik.eth"
              onKeyDown={addressChanged}
            />
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <LoadingBlocksWave width={60} height={60} />
            </div>
          ) : data.length > 0 ? (
            <div className="my-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full h-[calc(100%_-_50px)] overflow-x-hidden overflow-y-auto nft-wrapper px-2">
              {data.map((nft, index) => (
                <NFTCard nft={nft} key={index} openDetails={openPopupDialog} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full font-bold text-3xl text-white">
              <span>There are no Nfts</span>
            </div>
          )}
        </div>
      </div>
      {detailInfo.isOpen && (
        <Details
          address={detailInfo.address}
          tokenId={detailInfo.tokenId}
          onClose={closePopupDialog}
        />
      )}
    </div>
  );
};

export default Layout;
