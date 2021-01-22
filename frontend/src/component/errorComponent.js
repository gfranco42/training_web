import { toast } from "react-toastify"
import React, {Component} from "react";

class ErrorComponent extends Component {

    componentDidMount = () => {
        if (window.location.href !== "http://localhost:3000/error") {
            console.log(window.location);
            toast("Oh malheureux ! Cette pas n'existe point !")
        }
        else {
            toast.error(localStorage.error, {
                position: "top-center",
                hideProgressBar: true,
                className: "toastError",
                closeButton: false,
            });
            localStorage.removeItem("error");
        }
    }

    render() {

        return (
            <div className="errorComponent">
                Oupsi
            </div>
        )
    }
}

export default ErrorComponent;