import { createSlice } from "@reduxjs/toolkit";

function findIdInArray(id, state) {
    const search = state.find((item) => item.id == id)
    return search
}

function checkResIdAlreadyInCart(resId, state) {
    const search = state.every((item) => item.resId == resId)
    return search
}

function handleLocalStorage(state) {
    localStorage.setItem('cartItem', JSON.stringify(state))
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: JSON.parse(localStorage.getItem('cartItem')) || [],
    reducers: {
        addTocart(state, action) {
            const findResId = checkResIdAlreadyInCart(action.payload.resId, state)
            if (findResId) {
                localStorage.setItem('cartItem', JSON.stringify([...state, { ...action.payload, quantity: 1, restaurantChange: false }]))
                return [...state, { ...action.payload, quantity: 1, restaurantChange: false }]
            } else {
                localStorage.setItem('cartItem', JSON.stringify([...state, { ...action.payload, quantity: 1, restaurantChange: true }]))
                return [...state, { ...action.payload, quantity: 1, restaurantChange: true }]
            }
        },

        addMultiple(state, action) {
            const findedId = findIdInArray(action.payload, state)
            if (findedId !== undefined) {
                findedId.quantity += 1
            }
            handleLocalStorage(state)
        },

        removeItem(state, action) {
            const findedId = findIdInArray(action.payload, state)
            if (findedId !== undefined && findedId.quantity > 1) {
                findedId.quantity -= 1
            } else {
                return state = state.filter((item) => item.id !== findedId.id)
            }
            handleLocalStorage(state)
        },

        cancelToAddNewRes(state, action) {
            const deleteRes = state.filter((item) => item.resId !== action.payload)
            handleLocalStorage(deleteRes)
            return deleteRes
        },

        addNewRes(state, action) {
            const newRes = state.filter((item) => item.resId == action.payload)
            if (newRes) {
                let show = newRes.map((item) => {
                    if (item.restaurantChange) {
                        return {
                            ...item, restaurantChange: false
                        }
                    } else {
                        return item
                    }
                })
                handleLocalStorage(show)
                return show
            }
        }
    }
})

export const { addTocart, addMultiple, removeItem, cancelToAddNewRes, addNewRes } = cartSlice.actions
export default cartSlice.reducer