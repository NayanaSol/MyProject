import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const ImageResults = (props) => {
  return (
    <div>
      <InfiniteScroll
        dataLength={props.data.length}
        // next={fetchImages}
        hasMore={props.hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="container">
          {props.data.map((gif, key) => (
            <div className="item" key={key}>
              <img
                src={gif.images.fixed_width.url}
                className="card-image"
                alt={gif.title}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default ImageResults;
