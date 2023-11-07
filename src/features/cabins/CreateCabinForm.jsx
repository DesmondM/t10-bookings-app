import { useForm } from 'react-hook-form';

// import { deleteRoom } from '../../services/apiRooms';
import { createEditRoom } from '../../services/apiRooms';
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


function CreateCabinForm({roomToEdit}) {
 const {id:editId, ...editValues} = roomToEdit;
 const isEditSession = Boolean(editId);

    const { register, handleSubmit, reset, getValues, formState  } = useForm({
        defaultValues: isEditSession? editValues:{}
    });
     const { errors } = formState;
    
     console.log(errors);
    const queryClient = useQueryClient();
   
  const { mutate:createRoom, isLoading: isCreating } = useMutation({
    mutationFn: createEditRoom,
    onSuccess: () => {
        toast.success('Room created successfully')
        queryClient.invalidateQueries({queryKey: ['rooms']})
        reset()
    },
    onError: (err) => {
        toast.error(err.message)
    }
  });
  const { mutate: editRoom, isLoading: isEditing } = useMutation({
    mutationFn: ({newRoomData, id})=>createEditRoom(newRoomData, id),
    onSuccess: () => {
        toast.success('Room edited successfully')
        queryClient.invalidateQueries({queryKey: ['rooms']})
        reset()
    },
    onError: (err) => {
        toast.error(err.message + 'room could not be edited')
    }
  });

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {

    const image = typeof data.image === 'string'? data.image: data.image[0];
    if (isEditSession) editRoom({newRoomData: {...data, image}, id: editId})
    else createRoom({newRoomData: {...data, image}, id: editId});
  }
  
const onError = (errors, e) => console.log("###", errors, e);

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} >
      <FormRow label={'Room name'} error={errors?.name?.message}>
        
        <Input
          type='text'
          id='name'
          disabled={isWorking}
          {...register('name', { required: 'Name is required' } )}
        />
       
      </FormRow>

      <FormRow  label={'Maximum capacity'} error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
            disabled={isWorking}
          {...register('maxCapacity', { 
            required: 'Maximum capacity is required',
            min: {value: 1, 
                  message: 'Minimum should be at least 1'}, })}
        />
        
      </FormRow>

      <FormRow  label={'Regular price'} error={errors?.regularPrice?.message} >
        <Input
          type='number'
          id='regularPrice'
          disabled={isWorking}
          {...register('regularPrice', { required: 'Regular price is required' })}
        />
      </FormRow>

      <FormRow label={'Discount'} error={errors?.discount?.message} >
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          disabled={isWorking}
          {...register('discount', {
            required:'Discount value is required',
            validate: (value) =>value<getValues().regularPrice || 'Discount value should be less than regular price'
        }) }
        />
       
      </FormRow>

      <FormRow  label={'Description'} error={errors?.description?.message}    >
        <Textarea
          type='number'
          id='description'
          defaultValue=''
          disabled={isWorking}
          {...register('description', {required:'Description is required'}) }
        />
      </FormRow>

      <FormRow  >
        <label htmlFor='image'>Image</label>
        <FileInput
          id='image'
          accept='image/*' 
          type='file'
          {...register('image', { required: isEditSession? false: 'Image is required' })}
          />
      </FormRow>

      <FormRow>
        <Button
          variation='secondary'
          type='reset'
        >
          Cancel
        </Button>
        <Button disabled={isWorking} >
            {isEditSession? 'Save changes' : 'Create new room'}
          
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
