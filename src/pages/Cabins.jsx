import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getRooms } from "../services/apiRooms";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import AddCabin from "../features/cabins/AddCabin";

function Cabins() {
    const [showForm, setShowForm] = useState(false)
  
  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>Filter / Sort</p>
     </Row>
     <Row>
        <CabinTable />
        <AddCabin/>
     </Row>
     </>
  );
}

export default Cabins;
