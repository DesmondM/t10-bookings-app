import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getRooms } from "../services/apiRooms";

function Cabins() {
    useEffect(() => {
        getRooms().then((data) => console.log("The data contents",data));
    }, []);
  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
      <img src="https://zwtzhwytbgcppyipsifp.supabase.co/storage/v1/object/public/rooms-images/cabin-004.jpg?t=2023-10-07T13%3A46%3A30.238Z" alt="cabin"  width={200}/>
    </Row>
  );
}

export default Cabins;
