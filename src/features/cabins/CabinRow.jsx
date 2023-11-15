import React, { useState } from 'react';
import styled from 'styled-components';
import { formatCurrency } from "../../utils/helpers"
import CreateCabinForm from './CreateCabinForm';
import { useDeleteRoom } from './useDeleteRoom';
import { HiSquare2Stack, HiPencil, HiTrash } from 'react-icons/hi2'
import { useCreateRoom } from './useCreateRoom';

// v1
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  /* transform: scale(1.66666) translateX(-2px); */
  transform: scale(1.5) translateX(-7px);
`;

const Room = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ room }) {

    const [showForm, setShowForm] = useState(false);
    const { isDeleting, deleteRoom } = useDeleteRoom()
    const { isCreating, createRoom } = useCreateRoom();

    const { id: roomId,
        name,
        description,
        maxCapacity,
        regularPrice,
        discount,
        image } = room;

    function handleDuplicate() {
        createRoom({
            name: `Copy of ${name}`,
            description,
            maxCapacity,
            regularPrice,
            discount,
            image
        })
    }

    return (
        <>
            <TableRow role="row">
                <Img src={image} alt={name} />
                <Room>{name}</Room>
                <div> Fits up to {maxCapacity} - {description}</div>
                <Price>{formatCurrency(regularPrice)}</Price>
                <Discount>{formatCurrency(discount * regularPrice * 0.01)}</Discount>
                <div > <button disabled={isCreating} onClick={handleDuplicate}><HiSquare2Stack /></button>
                    <button style={{ margin: "10px" }} onClick={() => setShowForm(show => !show)}><HiPencil /></button>
                    <button onClick={() => deleteRoom(roomId)} disabled={isDeleting}><HiTrash /></button>
                </div>
            </TableRow>
            {showForm && <CreateCabinForm roomToEdit={room} />}
        </>
    );
}

export default CabinRow;
