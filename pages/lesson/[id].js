import Layout from "../../components/layout";
import { getAllLessonIds, getLessonData } from "../../lib/courses";
import Date from "../../components/date";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import Link from "next/link";

export async function getStaticProps({ params }) {
  const lessonData = await getLessonData(params.id);

  return {
    props: {
      lessonData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllLessonIds();

  return {
    paths,
    fallback: false,
  };
}

export default function Lesson({ lessonData }) {
  return (
    <Layout>
      <Head>
        <title>{lessonData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{lessonData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={lessonData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: lessonData.contentHtml }} />
      </article>
      {lessonData.prev != "" && (
        <Link href={`/lesson/${lessonData.prev}`}>
          <a>Previous</a>
        </Link>
      )}

      <br />
      {lessonData.next != "" && (
        <Link href={`/lesson/${lessonData.next}`}>
          <a>Next</a>
        </Link>
      )}
    </Layout>
  );
}
