import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";
import Duration from "../../components/duration";
import Link from "next/link";
import { getCourseData, getAllCourseIds } from "../../lib/courses";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import the icons you need
import { faVideo, faFlask, faClock } from "@fortawesome/free-solid-svg-icons";

export function getStaticProps({ params }) {
  const courseData = getCourseData(params.id);

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
      <h1 className={utilStyles.headingXl}>Course: {courseData.title}</h1>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Lessons</h2>
        <ul className={utilStyles.list}>
          {courseData.fullLessons.map(
            ({ id, date, duration, type, description, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <small className={utilStyles.lightText}>
                  <FontAwesomeIcon
                    icon={faClock}
                    style={{ fontSize: 20, marginRight: 4, color: "gray" }}
                  />
                  <Duration durationInMinutes={duration} />
                </small>
                <br />
                <Link href={`/lesson/${id}`}>
                  <a>{title}</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>{description}</small>
                <br />
                <small className={utilStyles.lightText}>
                  {type == "lecture" && (
                    <FontAwesomeIcon
                      icon={faVideo}
                      style={{ fontSize: 20, color: "gray" }}
                    />
                  )}
                  {type == "lab" && (
                    <FontAwesomeIcon
                      icon={faFlask}
                      style={{ fontSize: 20, color: "gray" }}
                    />
                  )}
                </small>
              </li>
            )
          )}
        </ul>
      </section>
    </Layout>
  );
}
