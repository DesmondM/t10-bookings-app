import styled from "styled-components";
import Spinner from "../../ui/Spinner"
import CabinRow  from "../cabins/CabinRow"
import { useRooms } from "./useRooms";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";



// v2
// Right now this is not really reusable... But we will want to use a similar table for guests as well, but with different columns. ALSO, right now we are defining these columns in BOTH the TableHeader and the CabinRow, which is not good at all. Instead, it would be much better to simply pass the columns into the Table, and the table would give access to the columns to both the header and row. So how can we do that? Well we can again use a compound component! We don't HAVE to do it like this, there's a million ways to implement a table, also without CSS Grid, but this is what I chose

// v1
const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

// We want each table row to have a menu, and we only want one of them to be open at the same time. We also want this functionality to be reusable. We could add a openID state here to the table, but that wouldn't really be reusable... The best way is to use a compound component

// The hotel won't ever have a lot of cabins, so there is no need to paginate. So we will do no pagination, AND we will do filtering and sorting. So here we learn how to do it on the FRONT-END (later in the booking we will do the BACK-END version, which is more real world)

function CabinTable() {

    const {isLoading, rooms} = useRooms();

    if (isLoading) return <Spinner/>;
   
     return (
        <Menus>
        <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'> 
        <Table.Header>
            <div>Image</div>
            <div>Cabin</div>
            <div>Description</div>
            <div>Max Capacity</div>
            <div>Price</div>
            <div>Discount</div>
            <div></div>
        </Table.Header>
        {rooms.map((room) => (
            <CabinRow key={room.id} room={room} />
        ))}
        </Table>
        </Menus>
        
    );
}
export default CabinTable;
