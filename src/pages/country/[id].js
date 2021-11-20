import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
import styles from './Country.module.css';

const getCountry = async id => {
  try {
    const res = await axios.get(`http://restcountries.com/v2/alpha/${id}`);
    const country = await res.data;
    return country;
  } catch (error) {
    console.log('err?:', error.message);
  }
};

const Country = ({ country }) => {
  const [borders, setBorders] = useState([]);
  const getBorders = async () => {
    if (country.borders) {
      const borders = await Promise.all(
        country.borders.map(border => getCountry(border))
      );
      setBorders(borders);
    }
  };

  useEffect(() => {
    getBorders();
  }, []);

  return (
    <Layout title={country.name}>
      <div className={styles.overview_container}>
        <div className={styles.overview_container_left}>
          <div className={styles.overview_panel}>
            <img src={country.flag} alt={country.name} />
            <h1 className={styles.overview_name}>{country.name}</h1>
            <div className={styles.overview_region}>{country.region}</div>
            <div className={styles.overview_numdata}>
              <div className={styles.overview_population}>
                <div className={styles.overview_value}>
                  {country.population}
                </div>
                <div className={styles.overview_label}>Population</div>
              </div>
              <div className={styles.overview_area}>
                <div className={styles.overview_value}>{country.area}</div>
                <div className={styles.overview_label}>Area</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.overview_container_right}>
          <div className={styles.details_panel}>
            <h4 className={styles.details_panel_heading}>Details</h4>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Capital</div>
              <div className={styles.details_panel_value}>
                {country.capital}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Subregion</div>
              <div className={styles.details_panel_value}>
                {country.subregion}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Language</div>
              <div className={styles.details_panel_value}>
                {country.languages.map(({ name }) => name).join(', ')}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Currencies</div>
              <div className={styles.details_panel_value}>
                {country.currencies.map(({ name }) => name).join(', ')}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Native name</div>
              <div className={styles.details_panel_value}>
                {country.nativeName}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Gini</div>
              <div className={styles.details_panel_value}>
                {country.gini ? `${country.gini}%` : 'Not available'}
              </div>
            </div>

            <div className={styles.details_panel_borders}>
              <div className={styles.details_panel_borders_label}>
                Neighbours
              </div>

              <div className={styles.details_panel_borders_container}>
                {borders.map(({ flag, name, alpha3Code }) => (
                  <div
                    className={styles.details_panel_borders_country}
                    key={alpha3Code}
                  >
                    {/* <Link href='/' passHref> */}
                    <img src={flag} alt={name} />
                    <div className={styles.details_panel_borders_label}>
                      {name}
                    </div>
                    {/* </Link> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Country;

export const getStaticPaths = async () => {
  const res = await axios.get('https://restcountries.com/v2/all');
  const countries = await res.data;

  const paths = countries.map(country => ({
    params: {
      id: country.alpha3Code,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const country = await getCountry(params.id);
  return {
    props: {
      country,
    },
  };
};
