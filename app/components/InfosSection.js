import { connect } from 'react-redux'
import Infos from '../components/Infos'
import { switchToAdd, switchToViz, addGym } from '../actions/actions'


const mapStateToProps = (state) => {
  return {
    mode: state.mode,
    selected_infos: state.selected_infos,
    new_gym_hours: state.new_gym_hours,
    new_gym_coord: state.new_gym_coord
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    switchToAdd: () => {
      dispatch(switchToAdd())
    },
    switchToViz: () => {
      dispatch(switchToViz())
    },
    addGym: (body) => {
      dispatch(addGym(body));
    }
  }
}

const InfosSection = connect(
  mapStateToProps,
  mapDispatchToProps
)(Infos)

export default InfosSection
