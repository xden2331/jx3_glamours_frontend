import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ImageUploader from "react-images-upload";
import axios from "axios";
const FormData = require("form-data");

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
  }

  onChange = picture => {
    const formData = new FormData();
    formData.append("file", picture[0]);
    fetch("http://localhost:5000/api/outfits/", {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: formData
    });
    console.log(formData);
  };

  render() {
    return (
      <div>
        <ImageUploader
          withIcon={true}
          buttonText='Choose images'
          onChange={this.onChange}
          imgExtension={[".jpg", ".gif", ".png", ".gif", "jpeg"]}
          maxFileSize={5242880}
        />
      </div>
    );
  }
}

export default withRouter(Upload);
