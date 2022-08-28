import React, { useState, Suspense } from "react"
import './Home.css';
import { TailSpin } from "react-loader-spinner";
import image from "../src/assets/icon3.svg"
import Lottie from "react-lottie";
import data from "../src/assets/no-results.json"
import loc from "../src/assets/loc.json"




import { fetchResponseData } from "./api";


const initialResource = fetchResponseData(560034);

function Home() {

    const defaultOptions = {
        
                loop: true,
                autoplay: true,
                animationData: data,
                rendererSettings : {
                    PreserveAspectRatio : 'xMidYMid slice'
                }

    }
    const defaultOptions2 = {
        
        loop: true,
        autoplay: true,
        animationData:loc ,
        rendererSettings : {
            PreserveAspectRatio : 'xMidYMid slice'
        }

}

    

    const [responseData, setResponseData] = useState(initialResource);

    const debounce = (func, time = 1000) => {
        let timer;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, time)
        }

    }

    const handleInput = async (e) => {
        let value = e.target.value;
        var pat1 = /^\d{6}$/;
        var pat2 = /^[A-Za-z][A-Za-z]*$/;
        if((value.length < 6) && pat2.test(value)) 
        {return <div className="container">
               
        <Lottie options={defaultOptions} height={300} width={300}></Lottie>
        <h3 className="container-heading">No results found</h3>
     </div>
        }
        if (pat1.test(value) || pat2.test(value)) {
            setResponseData(fetchResponseData(value));
        }
        else {
             return <div className="container">
               
            <Lottie options={defaultOptions} height={300} width={300}></Lottie>
            <h3 className="container-heading">No results found</h3>
         </div>
        }
    }

    function ProfileDetails() {
        const results = responseData.results.read();
        console.log("results", results);
        if (results[0].Status === 'Success') {
            return (
                <div className="home-table" >
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Post Office :</th>
                                <th>Branch Type :</th>
                                <th>Delivery Status : </th>
                                <th>District : </th>
                                <th>State : </th>
                                <th>Pincode :</th>
                            </tr>
                        </thead>
                        {results[0].PostOffice.map((item) =>

                            <tbody>
                                <tr>
                                    <td>{item.Name}</td>
                                    <td>{item.BranchType}</td>
                                    <td>{item.DeliveryStatus}</td>
                                    <td>{item.District}</td>
                                    <td>{item.State}</td>
                                    <td>{item.Pincode}</td>
                                </tr>
                            </tbody>
                        )}
                    </table>
                </div>)

        }
        else {
            return <div className="container">  
               <Lottie options={defaultOptions} height={300} width={300}></Lottie>
               <h3 className="container-heading">No results found</h3>
            </div>
        }

    }
    return (
        <div className="home">

            <div className="home-container-left">
                <div > 
                <div className="home-container-left-lottie"><Lottie options={defaultOptions2} height={600} width={600}></Lottie></div>
                    {/* <div><img className="home-container-left-image" src="https://img.freepik.com/free-vector/postman-delivering-mail-illustration-young-mailman-courier-putting-correspondence-mailbox_575670-375.jpg?t=st=1657193108~exp=1657193708~hmac=408396d9e1817bf551034fde04946228f055519f86826860d7cec1210c0ade80&w=2000" alt="" /></div> */}
                    <div><h1 className = "home-container-heading">Welcome to Pincode finder</h1>
                        <h5 className = "home-container-subheading">We help you find any pincode. Enter a place name !</h5>
                    </div>
                </div>


            </div>
            <div className="home-container-right">
                <div>
                    <header><div>
                        <img src={image} alt="" width={'60px'} height={'60px'} />
                    </div> <h1 className = "home-container-heading">Hello Guest !</h1>
                    <h4>
                        <label className = "home-container-subheading"> Please Enter a place name or a pincode</label>
                    </h4>
                    </header>

                    <input
                        type="search"
                        onChange={debounce(handleInput)}
                        placeholder="Enter place or pincode here ..."

                    />
                    <Suspense
                        fallback={
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: "90px",
                                }}
                            >
                                <TailSpin
                                    type="Rings"
                                    color="#00BFFF"
                                    height={200}
                                    width={200}
                                    timeout={8000}
                                />
                            </div>
                        }
                    >
                        {ProfileDetails()}
                    </Suspense>

                    <div >

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Home;



