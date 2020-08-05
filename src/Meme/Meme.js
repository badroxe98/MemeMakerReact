import React ,{useState,useEffect} from "react";
import styles from "./styles.module.css";


export const Meme =()=>{

    const [memes,setMemes]=useState([]);
    let [memeIndex,setMemeIndex]=useState(0);

    useEffect(()=> {
        fetch("https://api.imgflip.com/get_memes").then(res=>{
            res.json().then(res=>{
                const memes=res.data.memes;
                setMemes(memes);
            });
        });
    },[]);

    const shuffleMemes = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * i);
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      };
      
    return(
        memes.length ?
        <div className={styles.container}>
            <button className={styles.generate} onClick={()=>{
                console.log("generated!");
            }}>Generate</button>
        <button className={styles.skip} onClick={()=>{
            setMemeIndex(memeIndex + 1);}
        } >Skip</button>
         <img alt="meme" height="750px" width="500px" src={memes[memeIndex].url}></img>
        </div>
        : <div>Hello</div>
        
    );
}


