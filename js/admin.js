const crearJuego = () =>{
        const title = document.getElementById ("title").value
        const date = document.getElementById ("date").value
        const price = document.getElementById ("price").value
        const synopsis = document.getElementById ("synopsis").value
        const categorie = document.getElementById ("categorie").value
        const developer = document.getElementById ("developer").value
        const rating = document.getElementById ("rating").value
        const favorite = document.getElementById ("favorite").value
        const image1 = document.getElementById ("image1").value
        const image2 = document.getElementById ("image2").value
        const image3 = document.getElementById ("image3").value
        const image4 = document.getElementById ("image4").value

        fetch("http://localhost:3000/games", {
            method:"POST",
            body: JSON.stringify({
                title,
                date,
                price,
                synopsis,
                categorie,
                developer,
                rating,
                favorite,
                image1,
                image2,
                image3,
                image4
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
    }