import styles from './AllRecipes.module.css';

/* eslint-disable-next-line */
export interface AllRecipesProps {}

export function AllRecipes(props: AllRecipesProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to AllRecipes!</h1>
    </div>
  );
}

export default AllRecipes;
