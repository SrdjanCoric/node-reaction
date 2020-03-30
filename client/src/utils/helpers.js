import moment from "moment";
import decode from "jwt-decode";

export const dueClass = card => {
  const diff = moment(card.dueDate).diff(new Date(), "days");

  if (card.completed) {
    return "completed";
  } else if (diff < -1) {
    return "overdue";
  } else if (diff < 0) {
    return "overdue-recent";
  } else if (diff < 1) {
    return "due-soon";
  } else {
    return "due-later";
  }
};

export const formatDueDate = dueDate => {
  const momentDate = moment(dueDate);
  let formatString;

  if (momentDate.toDate().getFullYear() === new Date().getFullYear()) {
    formatString = "MMM D";
  } else {
    formatString = "MMM D, YYYY";
  }

  let formatted = momentDate.format(formatString);

  return `${formatted}`;
};

export const checkAuth = () => {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    return false;
  }

  try {
    const { exp } = decode(token);
    if (exp < new Date().getTime() / 1000) {
      clearStorage();
      return false;
    }
  } catch (e) {
    clearStorage();
    return false;
  }
  return true;
};

export const clearStorage = () => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("user");
};
