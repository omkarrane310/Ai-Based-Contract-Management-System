import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const fakeData = {
  opportunities: "This contract provides employees with opportunities for professional growth, training programs, and potential promotions within the organization.",
  risks: "Employees must adhere to strict company policies. Violation of these may result in termination or legal action. Confidentiality clauses must be maintained at all times.",
  purpose: "The purpose of this contract is to outline the terms of employment, including responsibilities, benefits, and company expectations for the employee.",
  summary: "This contract establishes the working relationship between the employer and employee, detailing salary, working hours, leave policies, and termination conditions."
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    // Check for matching predefined answers
    const lowerCaseQuestion = question.toLowerCase();
    if (lowerCaseQuestion.includes("opportunities")) {
      return res.status(200).json({ answer: fakeData.opportunities });
    } else if (lowerCaseQuestion.includes("risks")) {
      return res.status(200).json({ answer: fakeData.risks });
    } else if (lowerCaseQuestion.includes("purpose")) {
      return res.status(200).json({ answer: fakeData.purpose });
    } else if (lowerCaseQuestion.includes("summary")) {
      return res.status(200).json({ answer: fakeData.summary });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText?key=${process.env.GEMINI_API_KEY}`,
        { prompt: question },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const answer = response.data?.candidates?.[0]?.output || "No response from AI.";
      res.status(200).json({ answer });
    } catch (error: any) {
      console.error('Error fetching AI response:', error);

      if (error.response) {
        console.error('Response data:', error.response.data);
        res.status(error.response.status).json({ answer: fakeData.summary }); // Default fallback
      } else if (error.request) {
        console.error('Request data:', error.request);
        res.status(500).json({ answer: fakeData.summary });
      } else {
        console.error('Error message:', error.message);
        res.status(500).json({ answer: fakeData.summary });
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}