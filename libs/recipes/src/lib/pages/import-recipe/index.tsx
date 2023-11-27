import { useState, useEffect } from 'react';

import Head from 'next/head';
import { Importer } from '../../components/Importer/Importer';

type FormData = {
  url: string;
};

export function ImportRecipe() {
  const [formData, setFormData] = useState({});

  const handleSubmit = (dataFromChild) => {
    // Handle the form data received from the child component
    setFormData(dataFromChild);
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
          <Importer onSubmit={handleSubmit} />
          <div>
            <h3>Fetched Data:</h3>
            <pre>{}</pre>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImportRecipe;
