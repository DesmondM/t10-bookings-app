import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSettings } from './useSettings';
import Spinner from '../../ui/Spinner';
import { useUpdateSetting } from './useUpdateSetting';

function UpdateSettingsForm() {
    const {isLoading, settings:{
        minBookingLength,
        maxBookingLength,
        maxGuestsPerBooking,
        breakfastPrice
    }={},} = useSettings();

    const {updateSetting, isUpadating} = useUpdateSetting();

    const handleUpdate = (event, settingName) => {
        const value=event.target.value;
        updateSetting({[settingName]:value})
    }
   if (isLoading) {
    return<Spinner/>
   }
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights'
        defaultValue={minBookingLength} 
        onBlur={(event)=> handleUpdate(event, "minBookingLength")}
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' 
        defaultValue={maxBookingLength}
        onBlur={(event)=> handleUpdate(event, "maxBookingLength")}

        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' 
        defaultValue={maxGuestsPerBooking}
        onBlur={(event)=> handleUpdate(event, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price'
        defaultValue={breakfastPrice} 
        onBlur={(event)=> handleUpdate(event, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
