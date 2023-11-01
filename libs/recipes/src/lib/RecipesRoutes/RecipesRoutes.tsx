import styles from './RecipesRoutes.module.css';

/* eslint-disable-next-line */
export interface RecipesRoutesProps {}

export function RecipesRoutes(props: RecipesRoutesProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to RecipesRoutes!</h1>
    </div>
  );
}

export default RecipesRoutes;
