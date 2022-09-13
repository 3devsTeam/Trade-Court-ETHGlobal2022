import { offerActions } from "../store/offer.slice"
import { useDispatch } from "react-redux"
import { bindActionCreators} from "@reduxjs/toolkit"
import { formActions } from "../store/form.slice"

const actions = {
    ...offerActions,
    ...formActions
}

export const useActions = () => {

    const dispatch = useDispatch()

    return bindActionCreators(actions, dispatch)
}