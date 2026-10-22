import { useEffect } from "react";
import { getQuestions } from "../api/api";

function TestAPI() {

  useEffect(() => {
    getQuestions()
      .then((data) => {
        console.log("Questions:", data);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);

  return <div>Check console</div>;
}

export default TestAPI;