import React ,{useState,useEffect} from "react";
import styles from "./styles.module.css";
import {useHistory,useLocation} from "react-router-dom";
import {useClipboard} from "use-clipboard-copy"
export const MemeGenerated=()=>{

    
    const history=useHistory();
    const location=useLocation();
    const clipboard =useClipboard();
    const url=new URLSearchParams(location.search).get("url");

    const [copied,setCopied]=useState(false);

    const copylink=()=>{
        clipboard.copy(url);
        setCopied(true);
    }
    return(
        <div className={styles.container}>
            <button className={styles.home} onClick={()=>{
                history.push("/")
            }
                
            }>Make more memes  
            </button>
            
            {
                    url && <img src={url} alt="meme"></img>
                }
                <button className={styles.copy} onClick={copylink}>
                {copied ? 'Link copied!':'Copy the link'}
            </button>
        </div>
    )
}