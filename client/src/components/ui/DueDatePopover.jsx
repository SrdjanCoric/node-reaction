import React from "react";
import Pikaday from "pikaday";
import moment from "moment";
class DueDatePopover extends React.Component {
  componentDidMount() {
    this.picker = new Pikaday({
      field: document.querySelector(".datepicker-select-date input"),
      bound: false,
      container: document.getElementById("calendar-widget"),
      firstDay: 1,
      yearRange: 10,
      defaultDate: moment()
        .add(1, "day")
        .toDate(),
      setDefaultDate: true,
      format: "M/D/YYYY",
      i18n: {
        previousMonth: "Prev",
        nextMonth: "Next",
        months: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        weekdays: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        weekdaysShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
      },
      toString(date, format) {
        return moment(date).format(format);
      }
    });
    this.picker.show();
  }
  render() {
    return (
      <div class="popover due-date">
        <header>
          <span>Change due date</span>
          <a href="#" class="icon-sm icon-close"></a>
        </header>
        <div class="content">
          <form>
            <div class="datepicker-select">
              <div class="datepicker-select-date">
                <label>
                  Date
                  <input type="text" placeholder="Enter date" autofocus />
                </label>
              </div>
              <div class="datepicker-select-time">
                <label>
                  Time
                  <input
                    type="text"
                    placeholder="Enter time"
                    value="12:00 PM"
                  />
                </label>
              </div>
              <div id="calendar-widget"></div>
            </div>
            <button class="button" type="submit">
              Save
            </button>
            <button class="button red-button" type="reset">
              Remove
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default DueDatePopover;
