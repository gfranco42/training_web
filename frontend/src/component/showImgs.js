import React, {Component} from 'react';

class ShowImgs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            img: null,
            loading: true,
            user: null,
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

    deleteButton = (itemId) => {
        console.log(this.state.user.status)
        if (this.state.user.status === 'admin') {
            return (
                <button
                type="button"
                onClick={ (e) => {this.deleteImg(e, itemId)}}
                className="gallery__list__item--delete"
                name="delete">
                    Supprimer
                </button>
            )
        }
        else
            return null;

    }

    componentDidMount = async () => {
        try {
            const answer = await fetch("http://localhost:9000/img");
            const data = await answer.json();
            
            // GET USER INFOS
            const response = await fetch("http://localhost:9000/profil/", {
                method: "GET",
                headers: {token: localStorage.token}
            });
            const parseRes = await response.json();
            const {id, age, pseudo, email, status} = parseRes;
            // this.setState({img: data, loading: false});
            this.setState({user: parseRes, img: data, loading: false});
            console.log(this.state.user);
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
                            {this.deleteButton(item.id)}
                        </div>
                    )}
                </div>
            )
        }
    }
}

export default ShowImgs;