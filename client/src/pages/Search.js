import React from "react";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn} from "../components/Form";


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
                // loadBooks()
                console.log(res)
            })

        
            .catch(err => console.log(err));
        }
      };
    //   function handleFormSubmit(event) {
    //     event.preventDefault();
    //     if (formObject.title && formObject.author) {
    //       API.saveBook({
    //         title: formObject.title,
    //         author: formObject.author,
    //         synopsis: formObject.synopsis
    //       })
    //         .then(res => loadBooks())
    //         .catch(err => console.log(err));
    //     }
    //   };
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
                disabled={!(formObject.author && formObject.title)}
                onClick={handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            
            </form>  
            </Col>
            </Row>
            <Row>
            {books.length ? (
              <List>
                {books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
            </Row>
            </Container>
    )
}

export default Search;
