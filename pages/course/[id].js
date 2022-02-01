import Layout from "../../components/layout";
import { useRouter } from "next/router";

export default function Post() {
  const router = useRouter()
  const { id } = router.query

  return ( 
    <Layout>
      <p>Post: {id}</p>
    </Layout> 
  );
}