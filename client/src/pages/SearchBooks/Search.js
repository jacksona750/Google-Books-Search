import React, { Component } from "react";
import API from "../../utils/API";
import Jumbotron from "../../components/Jumbotron";
import Card from "../../components/Card";
import Form from "../../components/Form";
import { Col, Container, Row } from "../../components/Grid";
import { List } from "../../components/List";
import Book from "../../components/Book";
import Footer from "../../components/Footer";


class Search extends Component {
  state = {
    books: [],
    query: "",
    message: "Search For A Book To Begin!",
  };

  handleInputChange = event => {
    const { value } = event.target;
    this.setState({
      query: value
    });
  };

  searchBook = () => {
    API.getBook(this.state.query)
      .then(res => this.setState({ books: res.data.items }))
      .catch(() =>
        this.setState({
          books: [],
          message: "No New Books Found, Try a Different Query"
        })
      );
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.searchBook();
  };

  handleBookSave = id => {
    const book = this.state.books.find(book => book.id === id);
    API.saveBook({
      key: book.id,
      title: book.volumeInfo.title,
      link: book.volumeInfo.infoLink,
      authors: book.volumeInfo.authors.join(", "),
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks.thumbnail
    }).then(alert("Book Saved!"));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron />
          </Col>
          <Col size="md-12">
            <Card title="Book Search" icon="far fa-book">
              <Form
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
                query={this.state.query}
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
          <Card title="Results">
              {this.state.books.length ? (
                <List>
                  {this.state.books.map(book => (
                    <Book
                      key={book.id}
                      title={book.volumeInfo.title}
                      subtitle={book.volumeInfo.subtitle}
                      link={book.volumeInfo.infoLink}
                      authors={book.volumeInfo.authors.join(", ")}
                      description={book.volumeInfo.description}
                      image={book.volumeInfo.imageLinks.thumbnail}
                      Button={() => (
                        <button
                          onClick={() => this.handleBookSave(book.id)}
                          className="btn btn-primary ml-2"
                        >
                          Save
                        </button>
                      )}
                    />
                  ))}
                </List>
              ) : (
                <h2 className="text-center">{this.state.message}</h2>
              )}
            </Card>
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }
}

export default Search;
