import styles from './index.module.css';

/* eslint-disable-next-line */
export interface RecipesProps {}

export function Recipes(props: RecipesProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Recipes!</h1>
    </div>
  );
}

export default Recipes;
