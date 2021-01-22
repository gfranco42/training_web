import React, {Component} from 'react';
import S3FileUpload from 'react-s3';

class Upload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            access_key: process.env.REACT_APP_ACCESS_KEY,
            secret_key: process.env.REACT_APP_SECRET_KEY,
            bucket_name: process.env.REACT_APP_BUCKET,
            region: process.env.REACT_APP_REGION,
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
    
    componentDidMount = () => {
        console.log(this.state.access_key);
        console.log(this.state.secret_key);
        console.log(this.state.bucket_name);
        console.log(this.state.region);
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