import { useForm } from 'react-hook-form';

// import { deleteRoom } from '../../services/apiRooms';
import { createRoom } from '../../services/apiRooms';
// import { useCreateCabin } from 'features/cabins/useCreateCabin';
import FormRow  from '../../ui/FormRow';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
// import { useEditCabin } from './useEditCabin';
 import {Textarea} from '../../ui/Textarea';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import styled from 'styled-components';

const Error = styled.span`
font-size: 1.4rem;
color: var(--color-red-700);
`;

function CreateCabinForm() {
 
    const { register, handleSubmit, reset, getValues, formState  } = useForm();
     const { errors } = formState;
    
     console.log(errors);
    const queryClient = useQueryClient();
   
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createRoom,
    onSuccess: () => {
        toast.success('Room created successfully')
        queryClient.invalidateQueries({queryKey: ['rooms']})
        reset()
    },
    onError: (err) => {
        toast.error(err.message)
    }
  });

  function onSubmit(data) {
    mutate(data);
  }
  
const onError = (errors, e) => console.log("###", errors, e);

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} >
      <FormRow >
         <label htmlFor='name'>Name</label>
        <Input
          type='text'
          id='name'
          {...register('name', { required: 'Name is required' } )}
        />
         {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow >
        <label htmlFor='maxCapacity'>Maximum capacity</label>
        <Input
          type='number'
          id='maxCapacity'
          {...register('maxCapacity', { 
            required: 'Maximum capacity is required',
            min: {value: 1, 
                  message: 'Minimum should be at least 1'}, })}
        />
      </FormRow>

      <FormRow  >
        <label htmlFor='regularPrice'>Regular price</label>
        <Input
          type='number'
          id='regularPrice'
          {...register('regularPrice', { required: 'Regular price is required' })}
        />
      </FormRow>

      <FormRow  >
        <label htmlFor='discount'>Discount</label>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          {...register('discount', {
            required:'Discount value is required',
            validate: (value) =>value<getValues().regularPrice || 'Discount value should be less than regular price'
        }) }
        />
       
      </FormRow>

      <FormRow      >
        <label htmlFor='description'>Description</label>
        <Textarea
          type='number'
          id='description'
          defaultValue=''
          {...register('description', {required:'Description is required'}) }
        />
      </FormRow>

      <FormRow  >
        <label htmlFor='image'>Image</label>
        <FileInput
          id='image'
          accept='image/*' />
      </FormRow>

      <FormRow>
        <Button
          variation='secondary'
          type='reset'
        >
          Cancel
        </Button>
        <Button disabled={isCreating} >
          Create new cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
