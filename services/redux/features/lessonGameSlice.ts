import {createSlice} from "@reduxjs/toolkit"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const lessonGameSlice = createSlice({
    name:"game",
    initialState: {
        data: null,
        answers: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
      lessonGameData: (state, action) => {
        state.data = action.payload

       },
        pickAnswer: (state, action) => {
            const existingItem = state.answers.find((item) => item === action.payload);

            if (!existingItem) {
                // state.answers.push(action.payload);

                toast.success(`Added ${action.payload.title}`, {
                  position: toast.POSITION.BOTTOM_RIGHT,
                });
              } 

              state.total = (
                state.total * 1 +
                action.payload.minimum * action.payload.quantity
              );

        },
        removeAnswer: (state, action) => {

            const existingItem = state.answers.find(
                (item) => item === action.payload
              ); 

          const itemsToRemove =  state.answers.filter((item) => item !== action.payload);
          state.answers = itemsToRemove

          toast.error(`Removed ${action.payload.title}`, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });

          // state.total = (
          //   state.total * 1 -
          //   existingItem.minimum * existingItem.quantity
          // )

        },

    } 
});

export const {pickAnswer, removeAnswer, lessonGameData } = lessonGameSlice.actions;
export default lessonGameSlice.reducer;