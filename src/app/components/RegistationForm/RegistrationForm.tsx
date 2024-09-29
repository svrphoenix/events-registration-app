import { FC } from 'react';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { IParticipantSchema, SOURCE } from '@/interfaces/formInterfaces';
import { participantValidationSchema } from '@/app/utils/validationSchema';
import { Button, DatePicker, Input, Radio, RadioGroup } from '@nextui-org/react';
import { IParticipantRequest } from '@/interfaces/apiInterfaces';
import { parseDate } from '@internationalized/date';
import { addParticipant } from '@/services/api';

const defaultBirthDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear() - 18;

  return parseDate(`${yyyy}-${mm}-${dd}`);
};

interface IRegistrationFormProps {
  eventId: string;
  submitAction: () => void;
}

const RegistrationForm: FC<IRegistrationFormProps> = ({ eventId, submitAction }) => {
  const initialValues: IParticipantSchema = {
    fullName: '',
    email: '',
    birthDate: defaultBirthDate(),
    eventSource: SOURCE.SOCIAL,
  };

  const handleSubmit = async (values: IParticipantSchema) => {
    try {
      const newParticipant: IParticipantRequest = {
        fullName: values.fullName,
        email: values.email,
        birthDate: values.birthDate.toDate('UTC'),
        events: [{ eventSource: values.eventSource, eventId: eventId }],
      };

      console.log(newParticipant);
      await addParticipant(newParticipant);
      toast.info('Data saved successfully');
      submitAction();
    } catch (error) {
      console.log(error);
      toast.error('Error while adding new participant');
    }
  };

  const formik = useFormik({
    initialValues: { ...initialValues },
    validationSchema: participantValidationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form className="flex flex-col gap-3 py-5 px-5" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-3">
        <Input
          label="Full Name"
          type="text"
          name="fullName"
          className=""
          value={formik.values.fullName}
          onChange={formik.handleChange}
        />
        {formik.touched.fullName && formik.errors.fullName && (
          <div className="error">{formik.errors.fullName}</div>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <Input
          type="email"
          label="Email"
          name="email"
          className=""
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="error">{formik.errors.email}</div>
        )}
      </div>
      <DatePicker
        label="Date of Birth"
        name="birthDate"
        showMonthAndYearPickers
        defaultValue={defaultBirthDate()}
        value={formik.values.birthDate}
        onChange={value => formik.setFieldValue('birthDate', value)}
      />
      <div className="flex flex-row gap-3">
        <RadioGroup
          name="eventSource"
          label="Where did you hear about this event?"
          value={formik.values.eventSource}
          onChange={formik.handleChange}
        >
          <Radio value={SOURCE.SOCIAL}>Social Media</Radio>
          <Radio value={SOURCE.FRIENDS}>Friends</Radio>
          <Radio value={SOURCE.MYSELF}>Found Myself</Radio>
        </RadioGroup>
      </div>

      <Button className="m-auto" type="submit" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default RegistrationForm;
