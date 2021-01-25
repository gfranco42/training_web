import React, {Component} from 'react';

// COMPONENT
// import Upload from "./addImg.js";

class ShowImgs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            img: null,
            loading: true,
        }
    }

    deleteImg = async (e, id) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:9000/img/${id}`, {
                    method: "DELETE"
                });
            const data = this.state.img;
            this.setState({img: data.filter(img => img.id !== id)});
            if (response === null)
                console.log(response);
        } catch (error) {
            console.error(error.message);
        }
    } 


    componentDidMount = async () => {
        try {
            const response = await fetch("http://localhost:9000/img");
            const data = await response.json();
            this.setState({img: data, loading: false});
            console.log(this.state)
        } catch (error) {
            console.error(error.message); 
        }
    }

    render() {
        if (this.state.loading === true)
            return <div className="gallery--error">Chargement...</div>
        else if (this.state.img === null || this.state.img.length === 0)
            return (
                <div>
                    <div className="gallery--error">Aucune photo enregistrée !</div>
                </div>)
        else {
            return (
                <div className="gallery__list">
                    {this.state.img.map( (item) =>
                        <div className="gallery__list__item" key={item.id}>
                            <img src={item.url} alt="" className="gallery__list__item--img"/>
                            <button
                            type="button"
                            onClick={ (e) => {this.deleteImg(e, item.id)}}
                            className="gallery__list__item--delete"
                            name="delete">
                                Supprimer
                            </button>
                        </div>
                    )}
                </div>
            )
        }
    }
}

export default ShowImgs;