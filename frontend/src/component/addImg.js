import React, {Component} from 'react';
import S3FileUpload from 'react-s3';

class ImgUpload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            access_key: process.env.REACT_APP_ACCESS_KEY,
            secret_key: process.env.REACT_APP_SECRET_KEY,
            bucket_name: process.env.REACT_APP_BUCKET,
            region: process.env.REACT_APP_REGION,
            url: ""
        }
    }

    uploadingImg = async (e) => {
        e.preventDefault();
        const {access_key, secret_key, bucket_name, region} = this.state;
        const config = {
            bucketName: bucket_name,
            dirName: "",
            accessKeyId: access_key,
            secretAccessKey: secret_key,
            region: region,
        };

        const len = e.target.files.length;
        for (let i = 0; i < len; i++) {
            const data = await S3FileUpload.uploadFile(e.target.files[i], config)
            const url = data.location;
            const body = {url};
            const response = await fetch(
                "http://localhost:9000/img", {
                    method: "POST",
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify(body)
            });
            if (response === null)
                console.log(response);
        }
        window.location.reload();
    }

    render() {
        return (
            <div className="gallery__upload">
                <label
                className="gallery__upload--label"
                htmlFor="uploadBtn">
                    Selectionner une image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={this.uploadingImg}
                    className="gallery__upload--input"
                    id="uploadBtn"
                    name="upload"
                    multiple/>
            </div>
        )
    }
}

export default ImgUpload;