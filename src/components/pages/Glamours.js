import React, { Component } from "react";
import queryString from "query-string";
import axios from "axios";
import { Link, Redirect, withRouter } from "react-router-dom";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";

const isEmpty = require("is-empty");

function Section(props) {
  return (
    <div id='section'>
      <h2>
        Glamours
        <span> Collection</span>
      </h2>
    </div>
  );
}

class SearchGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clans: new Set(),
      bodyTypes: new Set()
    };
  }

  onSubmit = e => {
    e.preventDefault();
    var filter = {
      bodyType: Array.from(this.state.bodyTypes),
      clan: Array.from(this.state.clans)
    };
    console.log(queryString.stringify(this.state));
    this.props.onSearchSubmit(filter);
  };

  onChange = e => {
    const target = e.target;
    const set = this.state.bodyTypes;
    if (set.has(target.value)) {
      set.delete(target.value);
    } else {
      set.add(target.value);
    }
    this.setState({ bodyTypes: set });
  };

  onClick = e => {
    e.preventDefault();
    e.target.className = isEmpty(e.target.className) ? "unselected" : "";
    const set = this.state.clans;
    if (set.has(e.target.name)) {
      set.delete(e.target.name);
    } else {
      set.add(e.target.name);
    }
    this.setState({ clans: set });
  };

  render() {
    const bodyTypes = ["man", "woman", "loli", "boy"];
    const clan = ["wanhua", "cangyun"];
    var bodyTypeCheckboxes = bodyTypes.map(bodyType => {
      return (
        <div className='form-check form-check-inline' key={bodyType}>
          <input
            className='form-check-input'
            type='checkbox'
            id={bodyType}
            value={bodyType}
            onChange={this.onChange}
          />
          <label className='form-check-label' htmlFor={bodyType}>
            {bodyType}
          </label>
        </div>
      );
    });
    var clanButtons = clan.map(clan => {
      return (
        <span onClick={this.onClick} key={clan} className='clan-icon'>
          <Image
            src={"/assets/images/" + clan + ".png"}
            name={clan}
            className='unselected'
          />
        </span>
      );
    });
    return (
      <div>
        <Form className='search-group'>
          <Form.Group controlId='formTitle'>
            <Form.Label>Title</Form.Label>
            <Form.Control type='text' placeholder='Enter title' />
          </Form.Group>
          <div>{bodyTypeCheckboxes}</div>
          <div className='dropdown-divider'></div>
          <div className='mb-4'>{clanButtons}</div>
          <button type='submit' onClick={e => {}}>
            Reset
          </button>
          <button type='submit' onClick={this.onSubmit}>
            Submit
          </button>
        </Form>
      </div>
    );
  }
}

class Glamours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      outfits: [],
      filter: {}
    };
  }

  componentDidMount() {
    axios
      .get("/api/outfits", {
        params: {}
      })
      .then(res => {
        const data = res.data;
        this.setState({
          outfits: data
        });
      })
      .catch(err => console.log(err));
  }

  onSearchSubmit = filter => {
    axios
      .get("/api/outfits", {
        params: filter
      })
      .then(res => {
        const data = res.data;
        this.setState({
          outfits: data
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    var outfits = this.state.outfits.map(outfit => {
      return (
        <Col key={outfit._id} xs={12} lg={3} className='outfit-item'>
          <Image src={outfit.imgUrl} rounded fluid />
        </Col>
      );
    });
    return (
      <div>
        <Container>
          <Section />
          <Row>
            <Col className='d-none d-lg-block' lg={3}>
              <SearchGroup onSearchSubmit={this.onSearchSubmit} />
            </Col>
            <Col className='outfit-list'>
              <Row>{outfits}</Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(Glamours);
