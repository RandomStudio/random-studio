import { SUSTAINABILITY_PAGE_QUERY } from '../../api/QUERIES';
import getDataFromBackend from '../../api/getDataFromBackend';

const Sustainability = props => {
  console.log(props);

  return <h1>{'Sustainability'}</h1>;
};

export default Sustainability;

export const getStaticProps = async ({ preview }) => {
  const { page } = await getDataFromBackend({
    query: SUSTAINABILITY_PAGE_QUERY,
    preview: true,
  });

  console.log(page);

  return {
    props: {
      ...page,
    },
  };
};
