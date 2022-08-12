import { useWeb3React } from "@web3-react/core";
import PunkCard from "../../components/punk-card";
import Loading from "../../components/loading";
import RequestAccess from "../../components/request-access";
import { usePlatziPunksData } from "../../hooks/usePlatziPunksData";
import { Grid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const Punks = () => {
  const { active } = useWeb3React();
  const { loading, punks } = usePlatziPunksData();

  if (!active) return <RequestAccess />;
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(255px, 1fr))" gap={6}>
          {punks.map(({ name, image, tokenId }) => (
            <Link key={tokenId} to={`/punks/${tokenId}`}>
              <PunkCard name={name} image={image} />
            </Link>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Punks;
