import { offerActions } from "../store/offer.slice"
import { useDispatch } from "react-redux"
import { bindActionCreators} from "@reduxjs/toolkit"
import { formActions } from "../store/form.slice"
import { userActions } from "../store/user.slice"

const actions = {
    ...offerActions,
    ...formActions,
    ...userActions
}

export const useActions = () => {

    const dispatch = useDispatch()

    return bindActionCreators(actions, dispatch)
}