import React, { useState } from "react";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
import SaveBtn from "../components/SaveBtn";
import API from "../utils/API";


function Search() {

  const [books, setBooks] = useState([])
  const [searchInput, setSearchInput] = useState({})

  function handleInputChange(event) {
    const { name, value } = event.target;
    setSearchInput(value)
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (searchInput) {
      API.searchBook(searchInput)
        .then(res => {
          setBooks(res.data.items)
          console.log(res.data.items)

        })
       .catch(err => console.log(err));
    }
  };
  function saveBook(title, author, synopsis) {
    API.saveBook({
      title: title,
      author: author,
      synopsis: synopsis
    })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  return (
    <Container fluid>
      <Row>

        <Col size="sm-12">
          <Jumbotron>
            <h1>What Books Should I Read?</h1>
          </Jumbotron>
          <form>
            <Input
              onChange={handleInputChange}
              name="search"
              placeholder="Search (required)"
            />

            <FormBtn
              disabled={!(searchInput)}
              onClick={handleFormSubmit}
            >
              Submit Book
              </FormBtn>

          </form>
        </Col>
      </Row>
      <Row>
        {books.length ?
          books.map(book => (
            <div className="card" key={book.id} style={{ width: "18rem" }}>
              {/* <img className="card-img-top" src="..." alt="Card image cap"></img> */}
              <div className="card-body">
                <h5 className="card-title">{book.volumeInfo.title}</h5>
                <p className="card-text">{book.volumeInfo.authors[0]}</p>
                <p className="card-text">{book.searchInfo.textSnippet}</p>
              </div>
              <div className="card-body">
                <SaveBtn onClick={() => saveBook(book.volumeInfo.title, book.volumeInfo.authors[0], book.searchInfo.textSnippet)} />
              </div>
            </div>
          )
          ) : (
            <h3>No Results to Display</h3>
          )}
      </Row>
    </Container>
  )
}

export default Search;
