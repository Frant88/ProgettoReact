import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cardService } from "../service/cardService";

export const fetchAllCards = createAsyncThunk(
    "cards/fetch",
    async({limit, offset }, {rejectWithValue}) =>{
        try {
            return await cardService.getAllCards(limit,offset);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchCardsByName = createAsyncThunk(
    "cards/fetchByName",
    async (name , {rejectWithValue}) =>{
        try {
            return await cardService.getCardByName(name);
        } catch (error) {
           return rejectWithValue(error.message);
        }
    }
);
export const fetchCardsById = createAsyncThunk(
    "cards/fetchById",
    async (id, {rejectWithValue})=>{
        try {
            return cardService.getCardById(id);
        } catch (error) {
           return rejectWithValue(error.message); 
        }
    }
);

const cardsSlice = createSlice({
    name: "cards",
    initialState: {
        list: [],
        selectedCard: null,
        loading: false,
        error: null,
    },
    reducers: {
        setSelectedCard: (state,action)=>{
            state.selectedCard = action.payload
        },
        clearSelection: (state)=>{
            state.selectedCard = null;
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAllCards.pending,(state)=> {
            state.loading =true;
            state.error = null;
        })
        .addCase(fetchCardsByName.pending, (state) => { state.loading = true; state.error = null; })
        .addCase(fetchCardsById.pending, (state) => { state.loading = true; state.error = null; })
        .addCase(fetchAllCards.fulfilled, (state , action)=>{
            state.loading = false;
            state.list = action.payload;
        })
        .addCase(fetchAllCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCardsByName.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchCardsByName.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload; 
      })
      .addCase(fetchCardsById.fulfilled, (state , action)=>{
        state.loading = false;
        state.list = action.payload;
      });
    }
})

export const { setSelectedCard, clearSelection } = cardsSlice.actions;
export const  cardReducer = cardsSlice.reducer;