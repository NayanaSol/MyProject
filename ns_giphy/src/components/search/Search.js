import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageResults from "../images/ImageResults";
import Debounce from "./Debounce";

const Search = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("Sky");
  // const [hasMore, setHasMore] = useState(true);
  const [limit, setLimit] = useState(0);
  const [offset, setOffset] = useState(0);

  const debouncedTitle = Debounce(title, 500);

  useEffect(() => {
    const fetchImages = async () => {
      const api_key = "HWKPtRzBclGmcNuqeQ7yQRZGxkyPp9wK";
      //const api_key = process.env.NEXT_PUBLIC_GIPHY_API_KEY;
      const apiURL = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${debouncedTitle}&limit=${limit}&offset=${offset}&rating=g&lang=en`;
      setData([]);
      try {
        let fetchGif = await axios(apiURL);
        let response = fetchGif;
        console.log(response);
        if (response.status === 200) {
          setData(response.data.data);
          setLimit(50);
          setOffset(0);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (debouncedTitle) fetchImages();
  }, [limit, offset, debouncedTitle]);

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
