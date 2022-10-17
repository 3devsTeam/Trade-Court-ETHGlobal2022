import { offerActions } from "../context/offer.slice";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { formActions } from "../context/form.slice";
const actions = {
  ...offerActions,
  ...formActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};
