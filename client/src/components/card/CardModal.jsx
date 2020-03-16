import React from "react";
import { Link } from "react-router-dom";
import CardDescriptionContainer from "./CardDescriptionContainer";
import moment from "moment";
import { dueClass, formatDueDate } from "../../utils/helpers";
import NewCommentFormContainer from "./NewCommentFormContainer";

const CardModal = props => {
  const labels = card =>
    card.labels.map((label, idx) => (
      <div
        className="member-container"
        key={idx}
        onClick={e => props.onShowPopover(e, "labels")}
      >
        <div className={`card-label ${label} colorblindable`}></div>
      </div>
    ));
  const dueDateClass = dueClass(props.card);
  const formattedDueDate = formatDueDate(props.card.dueDate);
  let comments;
  if (props.card) {
    comments = props.comments.map(comment =>
      comment.isAction ? (
        <li key={`action_${comment._id}`}>
          <div className="member-container">
            <div className="card-member small-size">VR</div>
          </div>
          <p>
            <span className="member-name">Victor Reyes</span>{" "}
            {comment.description}{" "}
            <small>{moment(comment.createdAt).fromNow()}</small>
          </p>
        </li>
      ) : (
        <li key={`comment_${comment._id}`}>
          <div className="member-container">
            <div className="card-member">TP</div>
          </div>
          <h3>Taylor Peat</h3>
          <div className="comment static-comment">
            <span>{comment.text}</span>
          </div>
          <small>
            {moment(comment.createdAt).fromNow()} -{" "}
            <span className="link">Edit</span> -{" "}
            <span className="link">Delete</span>
          </small>
        </li>
      )
    );
  }
  return (
    <div id="modal-container">
      <div className="screen"></div>
      <div id="modal">
        <Link to={`/boards/${props.card.boardId}`}>
          {" "}
          <i className="x-icon icon close-modal"></i>
        </Link>
        {props.card.archived ? (
          <div className="archived-banner">
            <i className="file-icon icon"></i>
            This card is archived.
          </div>
        ) : null}
        <header>
          <i className="card-icon icon .close-modal"></i>
          <textarea
            name="title"
            onChange={e => props.onTitleChange(e)}
            onBlur={e => props.onTitleBlur(e)}
            className="list-title"
            value={props.title}
            style={{ height: "45px" }}
          />
          >
          <p>
            in list{" "}
            <a
              className="link"
              onClick={e => props.onShowPopover(e, "move-card")}
            >
              {props.list.title}
            </a>
            <i className="sub-icon sm-icon"></i>
          </p>
        </header>
        <section className="modal-main">
          <ul className="modal-outer-list">
            <li className="details-section">
              <ul className="modal-details-list">
                {props.card.labels.length > 0 ? (
                  <li className="labels-section">
                    <h3>Labels</h3>
                    {labels(props.card)}
                    <div
                      className="member-container"
                      onClick={e => props.onShowPopover(e, "labels")}
                    >
                      <i className="plus-icon sm-icon"></i>
                    </div>
                  </li>
                ) : null}
                {props.card.dueDate ? (
                  <li className="due-date-section">
                    <h3>Due Date</h3>
                    <div
                      id="dueDateDisplay"
                      className={dueDateClass}
                      onClick={e => props.onShowPopover(e, "due-date")}
                    >
                      <input
                        id="dueDateCheckbox"
                        type="checkbox"
                        className="checkbox"
                        defaultChecked={props.card.completed}
                        onClick={props.onToggleCompleted}
                      />
                      {formattedDueDate}
                    </div>
                  </li>
                ) : null}
              </ul>
              <CardDescriptionContainer
                description={props.card.description}
                onUpdateCard={props.onUpdateCard}
                card={props.card}
                user={props.user}
              />
            </li>
            <li className="comment-section">
              <NewCommentFormContainer
                cardId={props.card._id}
                onSubmit={props.onCreateComment}
                user={props.user}
              />
            </li>
            <li className="activity-section">
              <h2 className="activity-icon icon">Activity</h2>
              <ul className="horiz-list">
                <li className="not-implemented">Show Details</li>
              </ul>
              <ul className="modal-activity-list">{comments}</ul>
            </li>
          </ul>
        </section>

        <aside className="modal-buttons">
          <h2>Add</h2>
          <ul>
            <li className="member-button">
              <i className="person-icon sm-icon"></i>Members
            </li>
            <li
              className="label-button"
              onClick={e => props.onShowPopover(e, "labels")}
            >
              <i className="label-icon sm-icon"></i>Labels
            </li>
            <li className="checklist-button">
              <i className="checklist-icon sm-icon"></i>Checklist
            </li>
            <li
              className="date-button"
              onClick={e => props.onShowPopover(e, "due-date")}
            >
              <i className="clock-icon sm-icon"></i>Due Date
            </li>
            <li className="attachment-button">
              <i className="attachment-icon sm-icon"></i>Attachment
            </li>
          </ul>
          <h2>Actions</h2>
          <ul>
            <li
              className="move-button"
              onClick={e => props.onShowPopover(e, "move-card")}
            >
              <i className="forward-icon sm-icon"></i>Move
            </li>
            <li
              className="copy-button"
              onClick={e => props.onShowPopover(e, "copy-card")}
            >
              <i className="card-icon sm-icon"></i>Copy
            </li>
            <li className="subscribe-button">
              <i className="sub-icon sm-icon"></i>Subscribe
              <i className="check-icon sm-icon"></i>
            </li>
            <hr />
            {props.card.archived ? (
              <div>
                <li
                  className="unarchive-button"
                  onClick={props.onToggleArchive}
                >
                  <i className="send-icon sm-icon"></i>Send to board
                </li>
                <Link to={`/boards/${props.card.boardId}`}>
                  <li className="red-button" onClick={props.onDeleteCard}>
                    <i className="minus-icon sm-icon"></i>Delete
                  </li>
                </Link>
              </div>
            ) : (
              <li className="archive-button" onClick={props.onToggleArchive}>
                <i className="file-icon sm-icon "></i>Archive
              </li>
            )}
          </ul>
          <ul className="light-list">
            <li className="not-implemented">Share and more...</li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default CardModal;
