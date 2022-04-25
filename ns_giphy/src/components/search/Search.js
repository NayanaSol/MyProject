import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageResults from "../images/ImageResults";

const Search = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("Sky");
  const [hasMore, setHasMore] = useState(true);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      // const api_key = process.env.GIPHY_API_KEY;
      const apiURL = `https://api.giphy.com/v1/gifs/search?api_key=HWKPtRzBclGmcNuqeQ7yQRZGxkyPp9wK&q=${title}&limit=${limit}&offset=${offset}&rating=g&lang=en`;
      console.log(`hell0${apiURL}`);
      try {
        let fetchGif = await axios(apiURL);
        let response = fetchGif;
        console.log(response);
        if (response.status === 200) {
          setData(response.data.data);
          setLimit(20);
          setOffset(10);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchImages();
  }, [limit, offset, title]);

  const searchImages = (e) => {
    setTitle(e.target.value);
    setData([]);
  };

  return (
    <>
      <header>
        <input
          type="text"
          placeholder="Search"
          className="input"
          value={title}
          onChange={searchImages}
        />
      </header>
      <ImageResults data={data} />
    </>
  );
};

export default Search;
