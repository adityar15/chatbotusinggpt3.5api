import { Configuration, OpenAIApi } from "openai"

export default defineEventHandler(async (event) => {
  const courses = [
    //  you can add your data here and change the courses to something else.
    // you can also fetch data from a database or an API

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
