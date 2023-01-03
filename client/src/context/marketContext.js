import { createContext, useContext, useEffect, useState } from "react";
import {
    getProductRequest,
    getProductsRequest,
    createProductRequest,
    likeProductRequest,
    createCommentRequest,
} from '../api/marketplace'

const MarketContext = createContext()

export const useMarketPlace = () => {
    const context = useContext(MarketContext)
    if(!context) throw new Error('Market place provider is missing')
    return context
}

export const MarketProvider = ({ children }) => {
    const[products, setProducts] = useState([])

    useEffect(() => {
        (async () => {
            const res = await getProductsRequest()
            setProducts(res.data)
        })()
    },[])

    const getProduct = async(id) => {
        try {
            const res = await getProductRequest(id)
            return res.data
        } catch (error) {
            console.error(error)
        }
    }

    const createProduct = async(product) => {
        try {
            const res = await createProductRequest(product)
            setProducts([...products, res.data]) 
        } catch (error) {
            console.error(error)
        }
    }

    const likeProduct = async(productLiked) => {
        try {
            const res = await likeProductRequest(productLiked)
            return res.data
        } catch (error) {
            console.error(error)            
        }
    }

    const createComment = async(comment) => {
        try {
            const res = await createCommentRequest(comment)
            return res.data
        } catch (error) {
            console.error(error)            
        }
    }

    return(
        <MarketContext.Provider value={{ createComment, likeProduct, createProduct, getProduct, products }}>
            {children}
        </MarketContext.Provider>
    )
}