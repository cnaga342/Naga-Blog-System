import React from "react";

export const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className="text-3xl font font-semibold text-center my-7">
            About MohanKrishna writes
          </h1>
          <div className="text-md text-gray-500 flex flex-col gap-6">
            <p>
              Welcome to MohanKrishna Writes! This blog was created by Sarvjyoti, a
              passionate MERN stack developer, to share ideas, experiences, and
              knowledge about technology, coding, and beyond.
            </p>

            <p>
              Here, you'll find insightful articles on web
              development, software engineering, and programming concepts.
              Sarvjyoti loves exploring new tools and technologies, so there’s
              always fresh content to discover.
            </p>

            <p>
              Join the conversation! Feel free to leave comments, like others'
              thoughts, and engage with the growing community. Together, we can
              learn, inspire, and grow as tech enthusiasts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
