import { connect } from "react-redux";
import EditableListTitle from "./EditableListTitle";
import * as actions from "../../actions/ListActions";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onTitleUpdate: title => {
      dispatch(actions.updateListTitle(ownProps.listId, title));
    }
  };
};

export default connect(null, mapDispatchToProps)(EditableListTitle);
