import { useWeb3React } from "@web3-react/core";
import {
  Grid,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Button,
  FormHelperText,
  FormControl,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import PunkCard from "../../components/punk-card";
import Loading from "../../components/loading";
import RequestAccess from "../../components/request-access";
import { usePlatziPunksData } from "../../hooks/usePlatziPunksData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const Punks = () => {
  const { search } = useLocation();
  const [address, setAddress] = useState(
    new URLSearchParams(search).get("address")
  );
  const [submitted, setSubmitted] = useState(true);
  const [isValidAddress, setIsValidAddress] = useState(true);
  const { active, library } = useWeb3React();
  const { loading, punks } = usePlatziPunksData({
    owner: isValidAddress && submitted ? address : null,
  });
  const navigate = useNavigate();

  const handleAddressChange = ({ target: { value } }) => {
    setAddress(value);
    setSubmitted(false);
    setIsValidAddress(false);
  };

  const submit = (event) => {
    event.preventDefault();
    if (address) {
      const isValid = library.utils.isAddress(address);
      setIsValidAddress(isValid);
      setSubmitted(true);
      if (isValid) navigate(`/punks?address=${address}`);
    } else {
      navigate("/punks");
    }
  };

  if (!active) return <RequestAccess />;
  return (
    <>
      <form onSubmit={submit}>
        <FormControl>
          <InputGroup mb={3}>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              isInvalid={false}
              value={address ?? ""}
              onChange={handleAddressChange}
              placeholder="Buscar por dirección"
            />
            <InputRightElement width="5.5rem">
              <Button type="submit" h="1.75rem" size="sm">
                Buscar
              </Button>
            </InputRightElement>
          </InputGroup>
          {submitted && !isValidAddress && (
            <FormHelperText>Dirección inválida</FormHelperText>
          )}
        </FormControl>
      </form>
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
