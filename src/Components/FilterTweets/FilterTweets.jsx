import React, { Component } from 'react';
import './FilterTweets.css';

const FilterTweets =(props)=>{
    return (
        <React.Fragment>
            <form>
                <div className="form-group row">
                    <div className="col-md-3"></div>
                    <div className="col-md-4">
                        <input type="text" placeholder='Search' name='searchValue' onChange={props.handleChange} className='form-control'/>
                        {props.clientSideValidation.includes('tweetLength') && <div className='redColor'>Must A Number for Tweet Length Filter</div>}
                    </div>
                    <div className="col-md-4">
                        <select name="filterName" id="filterName" className='form-control' onChange={props.handleChange}>
                            <option value="" defaultValue>Select Filter Type</option>
                            <option value="tweetLength">Tweet Length</option>
                            <option value="textSearch">Text Search</option>
                            <option value='hashTags'>HashTags</option>
                        </select>
                    </div>
                    <div className="col-md-1">
                        <button className='btn btn-primary' onClick={props.searchTweets}>Search</button>
                    </div>
                </div>
            </form>
        </React.Fragment>
    );
}

export default FilterTweets;