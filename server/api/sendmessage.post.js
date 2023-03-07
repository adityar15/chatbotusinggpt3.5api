import { Configuration, OpenAIApi } from "openai"

export default defineEventHandler(async (event) => {
  const courses = [
    {
      name: "Learn Fast API by creating an API",
      type: "text-based-course",
      description: "Learn how to create a REST API using FastAPI, SQLAlchemy, Pydantic, JWT and advanced concepts like dependency injection, and more.",
      price: "19.99 GBP",
      url: "https://adiranids.com/courses/learn-fast-api-by-creating-an-api",
    },
    {
      name: "Learn Express with TypeScript by creating a Serverless API",
      type: "text-based-course",
      description: "Learn how to create a REST API using Express, TypeScript, Prisma, JWT, and advanced concepts like serverless api, deployment on Firebase, and more.",
      price: "29.99 GBP",
      url: "https://adiranids.com/courses/learn-express-with-typeScript-by-creating-a-serverless-api",
    },
    {
        name: "Python complete tutorial with application building.",
        type: "udemy-course",
        description: "Become a flexible python developer and learn about essential concepts of python programming.",
        url: "https://www.udemy.com/course/python-tutorial-with-application-build/learn/lecture/35538442?referralCode=9D7A6B41CD36B0EBE2F5#overview",
    },
    {
        name: "Learning Next.js and creating a web app",
        type: "udemy-course",
        description: "Complete Next 12 course with a real-world project. Learn Next.js, React, Tailwind CSS, and more.",
        url: "https://www.udemy.com/course/learning-nextjs-and-creating-a-web-app/learn/lecture/30440060?referralCode=F2356117D9AEED892536#overview",
    },

  ]

  const allCoursesLink = "https://adiranids.com/courses"

  const {messages} = await readBody(event)

  const runtimeConfig = useRuntimeConfig()

  const configuration = new Configuration({
    apiKey: runtimeConfig.API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  
  let chatHistory = [{
    role: "system", 
    content: `You are a Virtual Assistant. 
    Please consider this courses that we offer ${JSON.stringify(courses)} 
    The course is either classified as a text-based-course or a udemy-course.
    You can find all the courses here ${allCoursesLink}
    If asked about the course provide more information about it.
    If the course is not found, please ask them to subscribe to our newsletter.
    Answer all the questions in your capacity.
    `
  }, ...messages]

 

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: chatHistory,
  });

  const response = completion.data.choices[0].message

  return {
    message: response,
  }

})
