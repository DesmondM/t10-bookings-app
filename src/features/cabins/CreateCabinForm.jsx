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



function CreateCabinForm() {
 
    const { register, handleSubmit, reset,  } = useForm();
 
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
  


  return (
    <Form onSubmit={handleSubmit(onSubmit)} >
      <FormRow label='Room name' >
  
        <Input
          type='text'
          id='name'
          {...register('name' )}
        />
      </FormRow>

      <FormRow label='Maximum capacity'>
        <Input
          type='number'
          id='maxCapacity'
          {...register('maxCapacity')}
        />
      </FormRow>

      <FormRow label='Regular price' >
        <Input
          type='number'
          id='regularPrice'
          {...register('regularPrice')}
        />
      </FormRow>

      <FormRow label='Discount' >
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          {...register('discount')}
        />
      </FormRow>

      <FormRow
        label='Description for website'
        
      >
        <Textarea
          type='number'
          id='description'
          defaultValue=''
          {...register('description')}
        />
      </FormRow>

      <FormRow label='Room photo' >
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
