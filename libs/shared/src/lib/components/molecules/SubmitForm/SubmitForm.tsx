import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import { InputProps } from '../../atoms/Input/Input';

/* The `SubmitFormProps` interface defines the props that can be passed to the `SubmitForm` component.
It has two properties: */
interface SubmitFormProps {
  onSubmit: (data: any) => void;
  inputProps: InputProps;
}

/* The `export interface FormData` is defining an interface named `FormData`. This interface specifies
the shape of the data that will be submitted in the form. In this case, it has a single property
`text` of type `string`. This means that when the form is submitted, it will contain a field named
`text` with a string value. */
export interface FormData {
  text: string;
}

export function SubmitForm({ onSubmit, inputProps }: SubmitFormProps) {
  /* The code `const { handleSubmit, control, formState: { errors } } = useForm<FormData>();` is using
  the `useForm` hook from the `react-hook-form` library to initialize form functionality. */
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const { label, placeholder } = inputProps;

  /**
   * The function `handleFormSubmit` is a TypeScript React function that handles form submission by
   * calling the `onSubmit` function with the form data, and catches and logs any errors that occur.
   * @param data - The `data` parameter is of type `FormData`. It represents the data submitted in the
   * form.
   */
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
