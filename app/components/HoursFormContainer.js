import { connect } from 'react-redux'
import HoursForm from '../components/HoursForm'
import { updateNewGymHours } from '../actions/actions'
import translate from './translate';


const mapStateToProps = (state) => {
  return {
    language: state.language
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNewGymHours: (new_gym_hours) => {
      dispatch(updateNewGymHours(new_gym_hours))
    }
  }
}

const HoursFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HoursForm)

export default HoursFormContainer