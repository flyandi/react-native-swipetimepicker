/**
 * @imports
 */
import { StyleSheet} from 'react-native';


/**
 * @styles
 */
export default props => StyleSheet.create({


    swipeTimePickerContainer: {
        flexDirection: 'row',
        margin: 0,
        justifyContent: 'center' ,
        alignItems: 'center',
    },

    swipeTimePickerBoxContainer: {
        margin: props.spacing,
    },

});
