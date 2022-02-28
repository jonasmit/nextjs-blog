import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Date from "../components/date";
import Duration from "../components/duration";
import { getSortedCourseData } from "../lib/courses";
import Image from "next/image";

export default function Home({ allCourseData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Featured Courses</h2>
        <ul className={utilStyles.list}>
          {allCourseData.map(
            ({ id, date, title, description, image, duration, lessons }) => (
              <li className={utilStyles.listItem} key={id}>
                <small className={utilStyles.lightText}>
                  Test Duration: <Duration durationInMinutes={duration} />
                </small>
                <br />
                <Link href={`/course/${id}`}>
                  <a>{title}</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
                <br />
                <small className={utilStyles.lightText}>
                  Lessons: {lessons.length}
                </small>{" "}
                <br />
                <Image
                  src={image}
                  alt="Course Image"
                  height={144}
                  width={144}
                />
              </li>
            )
          )}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allCourseData = getSortedCourseData();
  return {
    props: {
      allCourseData,
    },
  };
}
