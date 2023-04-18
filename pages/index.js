import { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';

export default function Form() {
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('text-davinci-002');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    const URL = 'https://api.openai.com/v1/engines/' + model + '/completions';
    try {
      const response = await axios.post(
        URL,
        {
          prompt: prompt,
          max_tokens: 200,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      setResponse(response.data.choices[0].text);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Head>
        <title>Next.js で作る初めての OpenAI アプリ</title>
        <meta name="description" content="AI がどんな質問にも答えます" />
      </Head>

      <h1 className="text-3xl font-bold leading-3 text-gray-900 m-5">
        Next.js で作る初めての OpenAI アプリ
      </h1>

      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="mt-5 p-4 md:col-span-2 md:mt-0">
          <form onSubmit={handleSubmit}>
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                <div>
                  <label
                    htmlFor="Prompt"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    質問文
                  </label>
                  <div className="mt-2">
                    <textarea
                      rows={3}
                      className="mt-1 px-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                      placeholder="ここに質問を入れてください"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="model"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    モデルを選ぶ
                  </label>
                  <select
                    className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                  >
                    <option value="text-davinci-002">Davinci</option>
                    <option value="text-davinci-001">Davinci-codex</option>
                    <option value="text-curie-001">Curie</option>
                    <option value="text-babbage-001">Babbage</option>
                    <option value="text-ada-001">Ada</option>
                  </select>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  質問する
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="mt-4 mr-4 shadow sm:overflow-hidden sm:rounded-md">
          <div className="bg-white px-4 py-5 sm:p-6">
            <h2 className="text-base font-semibold leading-6 text-gray-900">
              質問の答え
            </h2>
            <p className="mt-1 text-sm text-gray-600">{response}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
