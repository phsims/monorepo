import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Head from 'next/head';
import { Input, Button } from '@shared';

type FormData = {
  url: string;
};

export function ImportRecipe() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const [data, setData] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async (formData: FormData) => {
    const { url } = formData;
    console.log('fetching', url);
    setIsLoading(true);
    await fetch(url).then((res) => console.log(res.text()));
    // try {
    //
    //   const response =

    //   if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   }
    //   const result = await response.text();
    //   console.log('response', result)
    //   setData(result);
    // } catch (error) {
    //   setError(error.message);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <>
      <Head>
        <title>Import a Recipe!</title>
      </Head>
      <div id="import-recipe" className="bg-primarylight">
        <div className="mx-auto max-w-7xl pt-20 sm:pb-24 px-6">
          <h2 className="text-3xl lg:text-5xl font-semibold mb-5 text-lightgrey md:4px ">
            Import a Recipe!
          </h2>
          <p>
            To import a recipe simply add a URL from the web and click import.
          </p>
          <p>This is still a work in progress</p>
          <form onSubmit={handleSubmit(fetchData)}>
            <div className="flex space-x-1 flex-stretch">
              <div className="  flex-col justify-center">
                <Controller
                  name="url"
                  control={control}
                  rules={{ required: 'URL is required' }}
                  render={({ field }) => <input />}
                />
                {errors.url && <p>{errors.url.message}</p>}
              </div>
              <div>
                <button type="submit" disabled={isLoading}>
                  {isLoading ? 'Fetching...' : 'Fetch Data'}
                </button>
              </div>
            </div>
          </form>
          {error && <div className="error">{error}</div>}
          <div>
            <h3>Fetched Data:</h3>
            <pre>{data}</pre>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImportRecipe;
