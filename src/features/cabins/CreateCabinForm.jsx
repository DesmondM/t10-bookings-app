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
  
    mutate({...data, image: data.image[0]});
  }
  
const onError = (errors, e) => console.log("###", errors, e);

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} >
      <FormRow label={'Room name'} error={errors?.name?.message}>
        
        <Input
          type='text'
          id='name'
          disabled={isCreating}
          {...register('name', { required: 'Name is required' } )}
        />
       
      </FormRow>

      <FormRow  label={'Maximum capacity'} error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
            disabled={isCreating}
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
          disabled={isCreating}
          {...register('regularPrice', { required: 'Regular price is required' })}
        />
      </FormRow>

      <FormRow label={'Discount'} error={errors?.discount?.message} >
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          disabled={isCreating}
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
          disabled={isCreating}
          {...register('description', {required:'Description is required'}) }
        />
      </FormRow>

      <FormRow  >
        <label htmlFor='image'>Image</label>
        <FileInput
          id='image'
          accept='image/*' 
          type='file'
          {...register('image', { required: 'Image is required' })}
          />
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
