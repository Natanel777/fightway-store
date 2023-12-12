export const fetchDocs = () => {
    return fetch('http://localhost:8080/docs')
        .then(response => response.json())
        .catch((e) => console.log(e)) //on failure
}

//demo
export const postDocs = () => {

    const someBody = {
        title: "Good"
    }

    fetch('http://localhost:8080/docs',{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization":"bearer ..."
        },
        body: JSON.stringify(someBody)
    });

}