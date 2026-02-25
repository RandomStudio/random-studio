import styles from './404.module.css';
import Container from "../components/Layout/Container/Container";
import Layout from "../components/Layout/Layout";

export default function Custom404() {
  return (
    <Layout className={styles.stack}>
      <Container className={styles.frame}>
        <h1 className={styles.message}>404 - Page Not Found</h1>
      </Container>
    </Layout>
  );
}
