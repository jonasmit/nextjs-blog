import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";
import Duration from "../../components/duration";
import Link from "next/link";
import { getCourseData, getAllCourseIds } from "../../lib/courses";

export function getStaticProps({ params }) {
  //const courseData = content.courses.find((element) => element.id == params.id);

  const courseData = getCourseData(params.id);
  console.log(courseData);

  return {
    props: {
      ...courseData,
    },
  };
}

export function getStaticPaths() {
  const paths = getAllCourseIds();

  return {
    paths,
    fallback: false,
  };
}

export default function Course(courseData) {
  return (
    <Layout>
      <p>Course: {courseData.title}</p>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Lessons</h2>
        <ul className={utilStyles.list}>
          {courseData.fullLessons.map(
            ({ id, date, duration, lessons, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <small className={utilStyles.lightText}>
                  Duration: <Duration durationInMinutes={duration} />
                </small>
                <br />
                <Link href={`/lesson/${id}`}>
                  <a>{title}</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
                <br />
                <small className={utilStyles.lightText}>
                  Lessons: {lessons}
                </small>
              </li>
            )
          )}
        </ul>
      </section>
    </Layout>
  );
}
