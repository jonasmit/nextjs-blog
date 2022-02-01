import Layout from "../../components/layout";
import content from "../../content/courses.json";
import utilStyles from "../../styles/utils.module.css";
import Duration from "../../components/duration";
import Link from "next/link";

export function getStaticProps({ params }) {
  var courseData = content.courses.find((element) => element.id == params.id);
  return {
    props: {
      ...courseData,
    },
  };
}

export function getStaticPaths() {
  const courses = content.courses;

  const paths = courses.map((course) => {
    return {
      params: {
        id: course.id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export default function Course(courseData) {
  return (
    <Layout>
      <p>Course: {courseData.course}</p>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Lessons</h2>
        <ul className={utilStyles.list}>
          {courseData.lessons.map(({ id, date, duration, lessons, title }) => (
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
              <small className={utilStyles.lightText}>Lessons: {lessons}</small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
