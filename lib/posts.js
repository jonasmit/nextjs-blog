import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import glob from "glob";

const contentDirectory = path.join(process.cwd(), "content/lessons");
const courseDirectory = path.join(process.cwd(), "content/courses");

export function getCourseData(courseId) {
  // Read markdown file as string
  const fullPath = path.join(courseDirectory, courseId + ".md");
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  const fullLessons = matterResult.data.lessons.map((lesson) => {
    // Read markdown file as string
    var fullPath = path.join(contentDirectory, lesson + ".md");
    var fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    var result = matter(fileContents);

    return {
      ...result.data,
    };
  });

  return {
    ...matterResult.data,
    fullLessons,
  };
}

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllCourseIds() {
  const files = glob.sync(courseDirectory + "/**/*.md");

  var fileNames = files.map((item) => {
    return item.substring(item.lastIndexOf("/") + 1);
  });

  console.log("****");
  console.log(fileNames);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export function getAllLessonIds() {
  const files = glob.sync(contentDirectory + "/**/*.md");

  var fileNames = files.map((item) => {
    return item.substring(item.lastIndexOf("/") + 1);
  });

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getLessonData(id) {
  const fullPath = path.join(contentDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
