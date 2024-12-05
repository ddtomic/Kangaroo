import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../CSS/Pages/SearchPage.css";
import ThreadBox from "../Props/ThreadBox";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import search from "../assets/images/icons8-search-50.png";
import * as Yup from "yup";

const SearchPage = () => {
  const [results, setResults] = useState([]);

  const { query } = useParams();
  const navTo = useNavigate();

  const searchValidationSchema = Yup.object().shape({
    searchBar: Yup.string()
      .min(1, "Search needs at least 1 character!")
      .required("Search content is required!"),
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString); // Parse the incoming date string
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  const reSearch = (data) => {
    navTo(`/search/${data.searchBar}`);
    getResults(data.searchBar);
  };

  const getResults = async (q) => {
    await axios
      .get(`http://localhost:3002/thread/search/${q}`)
      .then((response) => {
        return setResults(response.data);
      })
      .catch((error) => {
        return console.error(error);
      });
  };

  useEffect(() => {
    getResults(query);
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="search-container">
      <Navbar />
      <div className="main-container">
        <div className="search-heading-container">
          <h2>Search Our Community!</h2>
          <h4>Showing results for "{query}"</h4>
          <div className="search-search">
            <img src={search} alt="search-img"></img>
            <Formik
              initialValues={{ searchBar: query }}
              validationSchema={searchValidationSchema}
              onSubmit={reSearch}
            >
              <Form>
                <Field
                  autoComplete="off"
                  type="text"
                  placeholder="Search Roo..."
                  name="searchBar"
                />
              </Form>
            </Formik>
          </div>
        </div>

        <div className="search-header">
          <p>Found {results.length} result(s)</p>
        </div>
        <div className="search-catagories">
          <a>Most Recent</a>
          <a>Most Liked</a>
          <a>Most Commented</a>
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
