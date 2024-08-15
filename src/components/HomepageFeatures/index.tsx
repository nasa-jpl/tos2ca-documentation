import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'What is TOS2CA?',
    description: (
      <>
        TOS2CA allows users to define a phenomenon of interest, 
        curate data related to that phenomenon, and analyze that data.
      </>
    ),
  },
  {
    title: 'Open Source',
    description: (
      <>
        TOS2CA is an open source, Python-based cloud native software library.
      </>
    ),
  },
  {
    title: 'Community',
    description: (
      <>
        Ideas and suggestions from the community are welcome. Visit our community guidlines on contributing for additional information. 
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
