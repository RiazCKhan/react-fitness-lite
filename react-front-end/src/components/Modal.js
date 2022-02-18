import EditWorkout from "./EditWorkout"
import "./Exercises.scss";

const Modal = props => {
  if (!props.show) {
    return null
  }

  return (
    <div className="card background">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Title</h4>
        </div>
        <div className="card-body px-0">
          {<EditWorkout id={props.id} sets={props.sets} reps={props.reps} />}

        </div>
        <div className="modal-footer">
          <button className="button" onClick={props.onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default Modal