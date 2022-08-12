import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import usePlatziPunks from "../usePlatziPunks";

const getPunkData = async ({ platziPunks, tokenId }) => {
  const [
    tokenURI,
    dna,
    owner,
    accessoriesType,
    clotheColor,
    clotheType,
    eyeType,
    eyeBrowType,
    facialHairColor,
    facialHairType,
    hairColor,
    hatColor,
    graphicType,
    mouthType,
    skinColor,
    topType,
  ] = await Promise.all([
    platziPunks.methods.tokenURI(tokenId).call(),
    platziPunks.methods.tokenDNA(tokenId).call(),
    platziPunks.methods.ownerOf(tokenId).call(),
    platziPunks.methods.getAccessoriesType(tokenId).call(),
    platziPunks.methods.getAccessoriesType(tokenId).call(),
    platziPunks.methods.getClotheColor(tokenId).call(),
    platziPunks.methods.getClotheType(tokenId).call(),
    platziPunks.methods.getEyeType(tokenId).call(),
    platziPunks.methods.getEyeBrowType(tokenId).call(),
    platziPunks.methods.getFacialHairColor(tokenId).call(),
    platziPunks.methods.getFacialHairType(tokenId).call(),
    platziPunks.methods.getHairColor(tokenId).call(),
    platziPunks.methods.getHatColor(tokenId).call(),
    platziPunks.methods.getGraphicType(tokenId).call(),
    platziPunks.methods.getMouthType(tokenId).call(),
    platziPunks.methods.getSkinColor(tokenId).call(),
    platziPunks.methods.getTopType(tokenId).call(),
  ]);

  const responseMetadata = await fetch(tokenURI);
  const metadata = await responseMetadata.json();

  return {
    tokenId,
    tokenURI,
    attributes: {
      accessoriesType,
      clotheColor,
      clotheType,
      eyeType,
      eyeBrowType,
      facialHairColor,
      facialHairType,
      hairColor,
      hatColor,
      graphicType,
      mouthType,
      skinColor,
      topType,
    },
    dna,
    owner,
    ...metadata,
  };
};

const usePlatziPunksData = () => {
  const [punks, setPunks] = useState();
  const [loading, setLoading] = useState(true);
  const platziPunks = usePlatziPunks();

  const update = useCallback(async () => {
    if (platziPunks) {
      setLoading(true);

      const totalSupply = await platziPunks.methods.totalSupply().call();
      const tokenIds = new Array(4).fill().map((_, index) => index);

      const punksPromises = tokenIds.map((tokenId) =>
        getPunkData({ platziPunks, tokenId })
      );

      const allPunks = await Promise.all(punksPromises);

      setPunks(allPunks);
      setLoading(false);
    }
  }, [platziPunks]);

  useEffect(() => {
    update();
  }, []);

  return {
    punks,
    loading,
    update,
  };
};

const usePlatziPunkData = (tokenId = null) => {
  const [punk, setPunk] = useState();
  const [loading, setLoading] = useState(true);
  const platziPunks = usePlatziPunks();

  const update = useCallback(async () => {
    if (platziPunks && tokenId != null) {
      setLoading(true);
      const toSet = await getPunkData({ platziPunks, tokenId });
      setPunk(toSet);
      setLoading(false);
    }
  }, [platziPunks, tokenId]);

  useEffect(() => {
    update();
  }, [update]);
  return {
    punk,
    loading,
    update,
  };
};

export { usePlatziPunksData, usePlatziPunkData };
