import SearchRounded from '@material-ui/icons/SearchRounded';
import styles from './SearchInput.module.css';

function SearchInput({ ...rest }) {
  return (
    <div className={styles.wrapper}>
      <SearchRounded color='inherit' fontSize='small' />
      <input className={styles.input} {...rest} />
    </div>
  );
}

export default SearchInput;
