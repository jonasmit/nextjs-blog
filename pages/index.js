import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Date from "../components/date";
import content from "../content/featured.courses.json";
import Duration from "../components/duration";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello, I'm Jon.</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Featured Courses</h2>
        <ul className={utilStyles.list}>
          {content.courses.map(({ id, date, duration, lessons, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <small className={utilStyles.lightText}>
                Duration: <Duration durationInMinutes={duration} />
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
              <small className={utilStyles.lightText}>Lessons: {lessons}</small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
