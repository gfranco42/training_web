import React, { useState, useEffect} from 'react';


// class ShowImgs extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             img: null,
//             loading: true,
//             user: null,
//         }
//     }

const ShowImgs = () => {

    const [img, setImg] = useState("")
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    const deleteImg = async (e, id) => {
        e.preventDefault();
        const response = await fetch(
            `http://localhost:9000/img/${id}`, {
                method: "DELETE"
            });
        if (response === null)
            console.log(response);
        const data = user.img;
        this.setState({img: data.filter(img => img.id !== id)});
    }

    const deleteButton = (itemId) => {
        if (user.status === 'admin') {
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

    useEffect( () => {
        const getImg = async () => {
            const answer = await fetch("http://localhost:9000/img");
            const data = await answer.json();
            // GET USER INFOS
            const response = await fetch("http://localhost:9000/profil/", {
                method: "GET",
                headers: {token: localStorage.token}
            });
            const parseRes = await response.json();
            // const {id, age, pseudo, email, status} = parseRes;
            // this.setState({img: data, loading: false});
            // this.setState({user: parseRes, img: data, loading: false});
            setUser(parseRes)
            setLoading(false)
            setImg(data)
        }
        getImg();
    }, [])

    if (loading === true)
        return <div className="gallery--error">Chargement...</div>
    else if (img === null || img.length === 0) {
        return (
            <div>
                <div className="gallery--error">Aucune photo enregistrée !</div>
            </div>)
    }
    else {
        return (
            <div className="gallery__list">
                {img.map( (item) =>
                    <div className="gallery__list__item" key={item.id}>
                        <img src={item.url} alt="" className="gallery__list__item--img"/>
                        {deleteButton(item.id)}
                    </div>
                )}
            </div>
        )
    }
}

export default ShowImgs;