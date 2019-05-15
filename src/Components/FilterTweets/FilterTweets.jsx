import React, { Component } from "react";
import "./FilterTweets.css";

const FilterTweets = props => {
  return (
    <React.Fragment>
      <form>
        <div className="form-group row">
          <div className="col-md-3" />
          <div className="col-md-4">
            <select
              name="filterName"
              id="filterName"
              className="form-control"
              onChange={props.handleChange}
            >
              <option value="" selected defaultValue>
                Select Filter Type
              </option>
              <option value="tweetLength">Tweet Length</option>
              <option value="textSearch">Text Search</option>
              <option value="hashTags">HashTags</option>
            </select>
          </div>
          <div className="col-md-4">
            {props.filterName == "textSearch" ||
            props.filterName == "tweetLength" ? (
              <div>
                <input
                  type="text"
                  placeholder="Search"
                  name="searchValue"
                  onChange={props.handleChange}
                  className="form-control"
                />
                {props.clientSideValidation.includes("tweetLength") && (
                  <div className="redColor">
                    Must A Number for Tweet Length Filter
                  </div>
                )}
              </div>
            ) : props.filterName == "hashTags" ? (
              <select
                name="hashTag"
                id="hashTagArray"
                multiple="multiple"
                className="form-control"
              >
                <option value="" disabled defaultValue>
                  Select HashTag
                </option>
                {props.hashTagArray.map((hashTag, index) => {
                  return (
                    <option value={hashTag.value} key={index} defaultValue>
                      {hashTag.value}
                    </option>
                  );
                })}
              </select>
            ) : (
              ""
            )}
          </div>
          <div className="col-md-1">
            <button className="btn btn-primary" onClick={props.searchTweets}>
              Search
            </button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default FilterTweets;
