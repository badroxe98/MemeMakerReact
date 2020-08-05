import React ,{useState,useEffect} from "react";
import styles from "./styles.module.css";
import {useHistory,useLocation} from "react-router-dom";
export const MemeGenerated=()=>{

    const history=useHistory();
    const location=useLocation();
    const url=new URLSearchParams(location.search).get("url");
    return(
        <div className={styles.container}>
            <button onClick={()=>{
                history.push("/")
            }
                
            }>
                {
                    url && <img src={url} alt="meme"></img>
                }

                
            </button>
        </div>
    )
}