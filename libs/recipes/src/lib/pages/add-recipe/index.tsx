import Head from 'next/head';

// import styles from './index.module.css';

/* eslint-disable-next-line */
export interface AddRecipeProps { }

export function AddRecipe(props: AddRecipeProps) {
  return (
    <>
      <Head>
        <title>Add a Recipe!</title>
      </Head>
      <main >
        <h1>Welcome to Add!</h1>
      </main>
    </>

  );
}

export default AddRecipe;
