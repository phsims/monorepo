import styles from './Nav.module.scss';

/* eslint-disable-next-line */
export interface NavProps {}

export function Nav(props: NavProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Nav!</h1>
    </div>
  );
}

export default Nav;
