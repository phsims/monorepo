import styles from './Scraper.module.css';

/* eslint-disable-next-line */
export interface ScraperProps {}

export function Scraper(props: ScraperProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Scraper!</h1>
    </div>
  );
}

export default Scraper;
