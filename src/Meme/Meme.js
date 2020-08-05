import React ,{useState,useEffect} from "react";
import styles from "./styles.module.css";


export const Meme =()=>{

    const [memes,setMemes]=useState([]);
    const [memeIndex,setMemeIndex]=useState(0);
    const [captions,setCaptions]=useState([]);

    useEffect(()=> {
        fetch("https://api.imgflip.com/get_memes").then(res=>{
            res.json().then(res=>{
                const _memes=res.data.memes;
                shuffleMemes(_memes);
                setMemes(_memes);
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

      useEffect(() => {
          if(memes.length){
              setCaptions(Array(memes[memeIndex].box_count).fill(""));
          }
      }, [memeIndex,memes]);

      useEffect(()=>{
            console.log(captions)
      },[captions]);

      const updateCaption=(e,index)=>{
            const text =e.target.value || '';
            setCaptions(captions.map((c,i)=>{
                if(index===i){
                    return text;
                }
                else{
                    return c;
                }
            })
            )
      }

      const generateMeme=()=>{
            const currentMeme=memes[memeIndex];
            const formData= new FormData();

            formData.append('username',"badroxe98");
            formData.append('password',"Badroxe98");
            formData.append('template_id',currentMeme.id);
            captions.forEach((c,index)=> formData.append(`boxes[${index}][text]`,c));
            fetch("https://api.imgflip.com/caption_image",{
                method: 'POST',
                body: formData
            }).then(res=>{
                res.json().then(res=>{
                    console.log(res);
                });
            });
      };
      
    return(
        memes.length ?
        <div className={styles.container}>
            <button className={styles.generate} onClick={generateMeme
            }>Generate</button>
        <button className={styles.skip} onClick={()=>{
            setMemeIndex(memeIndex + 1);}
        } >Skip</button>
        {
            captions.map((c,index)=>(
                <input onChange={(e)=> updateCaption(e,index)} key={index}/>
            ))
        }

         <img alt="meme" height="750px" width="500px" src={memes[memeIndex].url}></img>
        </div>
        : <div>Hello</div>
        
    );
}


