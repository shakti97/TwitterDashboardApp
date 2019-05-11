import React, { Component } from 'react';
import './FilterTweets.css';

const FilterTweets =(props)=>{
    return (
        <React.Fragment>
            <form>
                <div className="form-group row">
                    <div className="col-md-6">
                        <input type="text" placeholder='Search' name='searchValue' onChange={props.handleChange} className='form-control'/>
                    </div>
                    <div className="col-md-6">
                        <select name="filterName" id="filterName" className='form-control' onChange={props.handleChange}>
                            <option value="" defaultValue disabled>Select Filter Type</option>
                            <option value="tweetLength">Tweet Length</option>
                            <option value="textSearch">Text Search</option>
                        </select>
                    </div>
                </div>
            </form>
        </React.Fragment>
    );
}

export default FilterTweets;