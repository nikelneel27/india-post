import React, { Suspense } from "react";
import {TailSpin} from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Home from './Home'

function Main() {
  
  return (
    <div>
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
        
          <Home />
       
      </Suspense>
    </div>
  );
}

export default Main;
