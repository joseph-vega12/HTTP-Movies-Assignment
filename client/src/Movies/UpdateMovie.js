import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const initialFormState = {
    // id: 5,
    title: '',
    director: '',
    metascore: "",
    stars: [''],
}
function UpdateMovie(props) {

    // console.log(props)

    const [ initalFormValues, setInitialFormValues ] = useState(initialFormState);
    const params = useParams();


    useEffect(()=>{
        // getData(); 
   

    const getData = () => {
        axios.get(`http://localhost:5000/api/movies/${params.id}`)
        .then(res => {
            setInitialFormValues(res.data);
            // console.log(res.data)            
        })
        .catch(err => {
            console.log(err);
        })
    }
    getData();
}, [])

// console.log(initalFormValues, "WHERE THE DATA LIVES");

    const handleChange = (e) => {
        setInitialFormValues({
            ...initalFormValues, 
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${params.id}`, initalFormValues)
        .then(res => {
            // props.setInitialFormValues(res.data);
            props.setMovieList(res.data);
            console.log(props.movieList);
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }
// console.log(props);
    return (
        <div>
            <form>
                <label>
                    Title:
                    <input type="text" name="title" onChange={handleChange} value={initalFormValues.title}/>
                </label>
                <label>
                    Director:
                    <input type="text"name="director" onChange={handleChange} value={initalFormValues.director}/>
                </label>
                <label>
                    Metascore:
                    <input type="number" name="metascore" onChange={handleChange} value={initalFormValues.metascore}/>
                </label>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default UpdateMovie