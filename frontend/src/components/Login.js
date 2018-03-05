import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import {PostData} from "../Services/PostData.js";
import {Redirect} from 'react-router-dom';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            loginError:false
        }
        this.signup = this.signup.bind(this);
    }

    signup(res, type) {

        let postData;

        if (type === "facebook" && res.email) {
            postData = {
                name: res.name,
                provider: type,
                email: res.email,
                provider_id: res.id,
                token: res.accessToken,
                provider_pic: res.provider_pic
            };
        }
        if (type === "google" && res.W3.U3) {
            postData = {
                name: res.w3.ig,
                provider: type,
                email: res.w3.U3,
                provider_id: res.El,
                token: res.Zi.access_token,
                provider_pic: res.w3.Paa
            };
        }
        if (postData) {
            PostData("signup", postData).then((result) => {
                    let responseJson = result;
                    if (responseJson.userData) {
                        sessionStorage.setItem("userData", JSON.stringify(responseJson));
                        this.setState({redirectToReferrer: true});
                    }
                }
            );
        }
        else{}
    }

    render() {

        if (this.state.redirectToReferrer || sessionStorage.getItem('userData')) {
            return (
                <Redirect to={"/home"}/>
            );
        }
        const responseGoogle = (response) => {
            console.log(response);
            this.signup(response, "facebook");
        }
        const responseFacebook = (response) => {
            console.log(response);
            this.signup(response, "google");
        }
        return (
            <div>
                <div classNameName="container" style={{textAlign: "center", padding: "1em"}}>
                    <div className="btn-group">
                        <FacebookLogin
                            appId="209550596295120"
                            autoLoad={true}
                            fields="name,email,picture"
                            callback={responseFacebook}/>,
                    </div>
                    <br/><br/>
                    <div className="btn-group">
                        <GoogleLogin
                            clientId="790268347843-8v1ab90153i7rn9om4rv35k36o8msuug.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                        />,
                    </div>
                    <br/><br/>
                </div>
            </div>);
    }
}

export default Login;