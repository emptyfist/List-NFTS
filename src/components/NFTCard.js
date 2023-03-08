import React from "react";
export const formatterInt = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

const NFTCard = ({ nft, openDetails }) => {
  return (
    <div className="text-white flex flex-col min-w-[280px] w-full rounded-bl-xl py-4 px-3 mx-auto rounded-2xl shadow-[-10px_-10px_15px_rgba(50,64,102,0.2)_10p_10px_15px_rgba(1,7,19,0.2)] bg-[#242f4e]">
      <div className="overflow-hidden rounded-2xl">
        <img
          className="w-full h-auto hover:scale-110 transition-all duration-500 cursor-pointer"
          onClick={(e) => openDetails(nft.contract.address, +nft.id.tokenId)}
          src={nft.contractMetadata.openSea.imageUrl}
          alt={nft.contractMetadata.name}
        />
      </div>
      <span className="font-bold text-2xl pt-4">
        {`${nft.contractMetadata.name} #${+nft.id.tokenId}`}
      </span>
      <a
        href={nft.contractMetadata.openSea.externalUrl}
        target="_blank"
        rel="noreferrer"
      >
        <span className="text-xl">
          {nft.contractMetadata.openSea.externalUrl}
        </span>
      </a>
      <span className="text-xl">{`Remains ${formatterInt.format(
        nft.balance
      )}`}</span>
    </div>
  );
};

export default NFTCard;
