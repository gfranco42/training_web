import { toast } from "react-toastify"
import React, {Component} from "react";

class ErrorComponent extends Component {

    componentDidMount = () => {
        if (window.location.href !== "http://localhost:3000/error") {
            console.log(window.location);
            toast.error("Oh malheureux ! Cette pas n'existe point !", {
                className: "toast",
                position: "top-center",
                hideProgressBar: true,
                closeButton: false,
            })
        }
        else {
            toast.error(localStorage.error, {
                className: "toast",
                position: "top-center",
                hideProgressBar: true,
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