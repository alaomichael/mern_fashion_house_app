
import React from 'react';
import './Search.css'
import algoliasearch from 'algoliasearch'
import { InstantSearch, SearchBox, Hits, Highlight, Stats, SortBy, Pagination } from 'react-instantsearch-dom';


const searchClient = algoliasearch("DDIJI46JBP", "086d662d9db57ab4d6626fc0185b390c")

function Search() {

    return (
        <>
        < InstantSearch searchClient={searchClient} indexName="prod_NAME" >
            <Header />
            <div className="body-content">
                <Content/>
            </div>
        </InstantSearch >
        <InstantSearch searchClient={ searchClient } indexName="prod_NAME">
            <SearchBox />
            <Hits />
        </InstantSearch>
        </>
    );        
};
const Header = () => (
    <header className="header">
        <SearchBox
            className="search-bar"
            translations={{ placeholder: 'Search for Customer Data' }}
        />
    </header>
);
const Hit = ({ hit }) => (
    <a href={"/"} >
        <div className="card">
            <div className="card-image">
                <img src={hit.image} alt={hit.name} className="image"/>
            </div>
             <div className="card-contents">                
                <Highlight attribute="title" hit={hit} className="card-title" />
                <Highlight attribute="year" hit={hit}  className="card-year"/>
                <div className="card-rating">Rating: {hit.rating}</div>
                <div className="card-genre"> <span>{hit.genre[0]}</span> <span>{hit.genre[1]}</span> </div>
            </div>
        </div>
    </a>
);
const Content = () => (
    <main>
        <div className="information">
            <div className="stats"> <Stats/> </div>
            <div className="">
                <SortBy defaultRefinement="movies"
                    items={[
                        { value: 'movies', label: 'Most Relevant' },   
                    ]}
                />
            </div>
        </div>
        <Hits hitComponent={Hit} />
        <div> <Pagination/></div>
    </main>
);
export default Search;
