import React, {Component} from 'react';
import S3FileUpload from 'react-s3';

class Upload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            access_key: "AKIA6ATD7R65UKPNI2OO",
            secret_key: "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",
            bucket_name: "asylum-heroes",
            region: "eu-west-3",
            testImg: "./test-img.png",
            finalImg: ""
        }
    }

    uploadingImg = (e) => {
        e.preventDefault();
        const {access_key, secret_key, bucket_name, region, testImg} = this.state;
        const config = {
            bucketName: bucket_name,
            dirName: "",
            accessKeyId: access_key,
            secretAccessKey: secret_key,
            region: region,
        };

        S3FileUpload.uploadFile(e.target.files[0], config)
        .then( data => {
            console.log(data.location)
            this.setState({finalImg: data.location})
        })
        .catch( (err) => {
            alert(err)
        })
    }

    test = () => {
        if (this.state.finalImg)
            return (<img alt="finalImg" src={this.state.finalImg}/>);
        else
            return null;
    }

    render() {
        return (
            <div>
                <input type="file" onChange={this.uploadingImg} />
                <this.test />
            </div>
        )
    }
}

export default Upload;