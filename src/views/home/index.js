import { useWeb3React } from "@web3-react/core";
import React, { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import usePlatziPunks from "../../hooks/usePlatziPunks";

export default function Home() {
  const [maxSupply, setMaxSupply] = useState();
  const { active } = useWeb3React();
  const platziPunks = usePlatziPunks();

  const getMaxSupply = useCallback(async () => {
    if (platziPunks) {
      const result = await platziPunks.methods.maxSupply().call();
      setMaxSupply(result);
    }
  }, [platziPunks]);

  useEffect(() => {
    getMaxSupply();
  }, [getMaxSupply]);

  if (!active) return "Conecta tu wallet";

  return <p>Max Supply: {maxSupply}</p>;
}
