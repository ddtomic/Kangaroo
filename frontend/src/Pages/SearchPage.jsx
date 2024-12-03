import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../CSS/Pages/SearchPage.css";
import ThreadBox from "../Props/ThreadBox";
import axios from "axios";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const [results, setResults] = useState([]);

  const { query } = useParams();

  const formatDate = (dateString) => {
    const date = new Date(dateString); // Parse the incoming date string
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  const getResults = async () => {
    await axios
      .get(`https://kangaroo.click:3002/thread/search/${query}`)
      .then((response) => {
        console.log(response);
        return setResults(response.data);
      })
      .catch((error) => {
        return console.error(error);
      });
  };

  useEffect(() => {
    getResults();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="main-container">
        <div className="heading-container">
          <h1>Search: {query}</h1>
        </div>
        <div className="result-container">
          {results.map((value, key) => {
            return (
              <ThreadBox
                key={key}
                main={false}
                threadID={value.threadID}
                name={value.userThread.username}
                title={value.title}
                timestamp={formatDate(value.createdAt)}
                replyCount={value.replyCount}
                score={+value.score}
                pfp={value.userThread.pfp}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
