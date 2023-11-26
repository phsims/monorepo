import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';

import Button, { ButtonProps } from '../../atoms/Button/Button';
import Input, { InputProps } from '../../atoms/Input/Input';

export interface SubmitForm {
  onSubmit: (data: FormData) => Promise<void>;
  inputProps: InputProps;
  buttonProps?: ButtonProps;
}

export interface FormData {
  text: string;
}

export function SubmitForm({ onSubmit, inputProps, buttonProps }: SubmitForm) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const handleFormSubmit: SubmitHandler<FormData> = async (data) => {
    onSubmit(data);
  };
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="relative text-white focus-within:text-white flex flex-row-reverse shadow-fi rounded-full">
        <Controller
          name="text"
          control={control}
          rules={{ required: `${inputProps.label} is required` }}
          render={({ field }) => (
            <Input
              {...field}
              {...inputProps}
              className="w-full py-6 sm:py-8 text-sm w-full text-black bg-white rounded-full pl-4 par-87 focus:outline-none focus:text-black"
            />
          )}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          <Button
            type="submit"
            className="p-1 focus:outline-none focus:shadow-outline"
            {...buttonProps}
          >
            <Image
              src={'/images/Newsletter/arrow.svg'}
              alt="inputicon"
              width={57}
              height={71}
            />
          </Button>
        </div>
      </div>
      {errors.text && <p className="py-2 px-6">{errors.text.message}</p>}
    </form>
  );
}

export default SubmitForm;
