import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import { InputProps } from '../../atoms/Input/Input';

interface SubmitFormProps {
  onSubmit: (data: any) => void;
  inputProps: InputProps;
}

export interface FormData {
  text: string;
}

export function SubmitForm({ onSubmit, inputProps }: SubmitFormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const { label, placeholder } = inputProps;

  const handleFormSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      onSubmit(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="relative text-white focus-within:text-white flex flex-row-reverse shadow-fi rounded-full">
        <Controller
          name="text"
          control={control}
          rules={{ required: `${label} is required` }}
          render={({ field }) => (
            <input
              {...field}
              placeholder={placeholder || label}
              aria-label={label}
              className="w-full py-6 sm:py-8 text-sm w-full text-black bg-white rounded-full pl-4 par-87 focus:outline-none focus:text-black"
            />
          )}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          <button
            type="submit"
            className="p-1 focus:outline-none focus:shadow-outline"
          >
            <Image
              src={'/images/Newsletter/arrow.svg'}
              alt="inputicon"
              width={57}
              height={71}
            />
          </button>
        </div>
      </div>
      {errors.text && <p className="py-2 px-6">{errors.text.message}</p>}
    </form>
  );
}

export default SubmitForm;
