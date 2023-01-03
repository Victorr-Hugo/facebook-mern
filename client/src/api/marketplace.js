import axios from "axios"

export const getProductRequest = async(id) => {
    await axios.get('/api/marketplace' + id)
}
export const getProductsRequest = async() => await axios.get('/api/marketplace')

export const createProductRequest = async(product) => {
    const form = new FormData();
    for (let key in product) {
      form.append(key, product[key]);
      console.log(key)
    }
    return await axios.post("/api/marketplace", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }); 
}

export const likeProductRequest = async(productLiked) => {
    const form = new FormData()
    for(let key in productLiked){
        form.append(key, productLiked[key])
    }
    return await axios.post('/api/marketplace/like', form, {
        headers:{
            "Content-Type": "multipart/form-data",        
        }
    })
}

export const createCommentRequest = async(comment) => {
    const form = new FormData()
    for(let key in comment){
        form.append(key, comment[key])
    }
    return await axios.post('/api/marketplace/comment', form, {
        headers:{
            "Content-Type": "multipart/form-data",        
        }
    })
}