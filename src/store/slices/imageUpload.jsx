import React, { Component } from "react";
import { Icon, Button, Image } from "semantic-ui-react";
import Compress from "compress.js";
// It renders "<" icon, on clicking it gets the earlier photo.
const BackArrow = (props) => (
  <div
    onClick={props.previousImage}
    style={{
      cursor: "contextMenu",
      color: "white",
      fontSize: "2em",
      marginRight: "-38px",
      zIndex: 1,
    }}
  >
    <Icon name="angle left" />
  </div>
);

//It renders ">" icon, on clicking it gets the next photo.
const NextArrow = (props) => (
  <div
    onClick={props.nextImage}
    style={{ color: "white", fontSize: "2em", marginLeft: "-38px", zIndex: 1 }}
  >
    <Icon name="angle right" />
  </div>
);

class ImageUploader extends Component {
  state = {
    pictures: [], // to store the pictures in base64 format.
    slideCount: 0, // to keep track of the photo number
  };
  nextImage = () => {
    let { slideCount } = this.state;
    if (slideCount !== this.state.pictures.length - 1) {
      slideCount = slideCount + 1;
    }
    this.setState({ slideCount });
  };
  previousImage = () => {
    let { slideCount } = this.state;
    if (slideCount !== 0) {
      slideCount = slideCount - 1;
    }
    this.setState({ slideCount });
  };
  handleImageChange = (e) => {
    e.preventDefault();
    // Getting multiple images from user's selection
    for (var i = 0; i < e.target.files.length; i++) {
      let file = e.target.files[i]; // console.log(file);
      if (!file.type.includes("image")) {
        alert("Please choose image");
      } else if (file.size / (1024 * 1024) > 5) {
        alert("Please choose image of smaller size");
      }
    }
    const compress = new Compress();
    const files = [...e.target.files];
    compress
      .compress(files, {
        size: 4,
        quality: 0.75,
        maxWidth: 1920,
        maxHeight: 1920,
        resize: true,
      })
      .then((modFiles) => {
        // modFiles are modified files with exif free and compressed
        //  versions of user selected images
        let uploadableFiles = [];
        for (var i = modFiles.length - 1; i >= 0; i--) {
          let file = Compress.convertBase64ToFile(
            modFiles[i].data,
            modFiles[i].ext
          );
          let filename = Date.now() + modFiles[i].alt;
          let filetype = modFiles[i].ext;
          let filelastMod = files[i].lastModified;
          uploadableFiles.push(
            new File([file], filename, {
              type: filetype,
              lastModified: filelastMod,
            })
          );
        }
        console.log(uploadableFiles);
        let img = new Image();
        console.log(img);
        let obj;
        img.onload = () => {
          obj = { width: img.width, height: img.height };
          this.setState({ pictures: [...this.state.pictures, obj] });
        };
        img.src = modFiles[i].prefix + modFiles[i].data;
      });
  };
  render() {
    const { pictures, slideCount } = this.state;
    return (
      <div>
        {pictures.length > 0 ? (
          <div>
            {pictures.map((photo, key) => {
              if (pictures.indexOf(photo) === slideCount) {
                return (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {slideCount !== 0 ? (
                      <BackArrow previousImage={this.previousImage} />
                    ) : (
                      ""
                    )}
                    <div
                      id="imageid"
                      key={photo.id}
                      style={{ margin: "0 auto" }}
                    >
                      <Image src={photo.src} alt="photo" />
                      {pictures.length > 1 && (
                        <div style={{ zIndex: 2 }}>
                          {" "}
                          {slideCount + 1} of {pictures.length}{" "}
                        </div>
                      )}
                    </div>
                    {slideCount !== pictures.length - 1 ? (
                      <NextArrow nextImage={this.nextImage} />
                    ) : (
                      ""
                    )}
                  </div>
                );
              }
              return "";
            })}
            <div style={{ padding: "5px" }}>
              <Button
                color="grey"
                icon="close"
                circular
                basic
                content="clear pictures"
                onClick={this.handleClearImages}
              />
            </div>
          </div>
        ) : (
          <div>
            <label htmlFor="upload-photo">
              /* An image is shown instead of input type="file" button. When
              user clicks on it, he can select the images from his gadget. */
              <img
                alt="upload images"
                src={"https://via.placeholder.com/512.png?text=Upload+images"}
              />
            </label>
            <input
              style={{ opacity: 0, zIndex: 1 }}
              id="upload-photo"
              type="file"
              multiple={true}
              onChange={this.handleImageChange}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ImageUploader;
