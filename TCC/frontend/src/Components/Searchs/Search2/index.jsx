import React from 'react';
import styled from 'styled-components';

const Search2 = ({ value, onChange, placeholder = "Pesquisar..." }) => {
  return (
    <StyledWrapper>
      <div className="navbar-container">
        <div className="search-bar">
          <div className="InputContainer">
            <svg className="searchIcon" width="20px" viewBox="0 0 24 24" height="20px" xmlns="http://www.w3.org/2000/svg">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M15.5 14h-.79l-.28-.27A6.518 6.518 0 0 0 16 9.5 
                       6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 
                       4.23-1.57l.27.28v.79l5 4.99L20.49 
                       19l-4.99-5zm-6 0C7.01 14 5 11.99 
                       5 9.5S7.01 5 9.5 5 14 7.01 14 
                       9.5 11.99 14 9.5 14z" />
            </svg>
            <input
              className="input"
              id="search-input"
              placeholder={placeholder}
              type="text"
              value={value}
              onChange={onChange}
            />
          </div>
          <div className="border" />
          <button aria-label="Voice search" className="micButton">
            <svg width="20px" viewBox="0 0 384 512" height="20px" className="micIcon" xmlns="http://www.w3.org/2000/svg">
              <path d="M192 0C139 0 96 43 96 96V256c0 53 
                       43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 
                       216c0-13.3-10.7-24-24-24s-24 10.7-24 
                       24v40c0 89.1 66.2 162.7 152 
                       174.4V464H120c-13.3 0-24 10.7-24 
                       24s10.7 24 24 24h72 72c13.3 0 
                       24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 
                       152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 
                       10.7-24 24v40c0 70.7-57.3 128-128 
                       128s-128-57.3-128-128V216z" />
            </svg>
          </button>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;

  .navbar-container {
    display: flex;
    justify-content: center;
    padding: 1rem;
    min-width: 100%;
  }

  .search-bar {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: #1a1b23;
    padding: 0.5rem 1rem;
    border-radius: 30px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
    transition: all 0.3s ease;
    border: 1px solid #2a2b33;
  }

  .search-bar:focus-within {
    background-color: #222533;
    border-color: #623bda;
    box-shadow: 0 4px 15px #6605d4;
  }

  .search-bar:hover {
    background-color: #222533;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.35);
  }

  .InputContainer {
    display: flex;
    align-items: center;
    flex-grow: 1;
    gap: 0.75rem;
  }

  .input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 1rem;
    background: none;
    color: #f0f0f0;
    padding: 0.5rem 0;
    font-family: inherit;
  }

  .input::placeholder {
    color: #8a8a8a;
    opacity: 1;
    transition: opacity 0.2s ease;
  }

  .input:focus::placeholder {
    opacity: 0.5;
  }

  .searchIcon {
    width: 20px;
    height: 20px;
    fill: #8a8a8a;
    transition: fill 0.2s ease;
  }

  .search-bar:focus-within .searchIcon {
    fill: #623bda;
  }

  .border {
    width: 1px;
    height: 24px;
    background-color: #3a3b43;
    margin: 0 0.75rem;
  }

  .micButton {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 50%;
    background: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .micButton:hover {
    background-color: #2a2b33;
  }

  .micIcon {
    width: 18px;
    height: 18px;
    fill: #8a8a8a;
    transition: fill 0.2s ease;
  }

  .micButton:hover .micIcon {
    fill: #ff5100;
  }
`;

export default Search2;
