import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getRooms } from "../services/apiRooms";
import CabinTable from "../features/cabins/CabinTable";

function Cabins() {
  
  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>Filter / Sort</p>
     </Row>
     <Row>
        <CabinTable />
     </Row>
     </>
  );
}

export default Cabins;
