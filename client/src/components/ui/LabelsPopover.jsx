import React from "react";
const LabelsPopover = () => {
  return (
    <div class="popover labels">
      <div id="add-options-labels-dropdown">
        <header>
          <span>Labels</span>
          <a href="#" class="icon-sm icon-close"></a>
        </header>
        <div class="content">
          <input
            class="dropdown-input"
            placeholder="Search labels..."
            type="text"
          />
          <div class="labels-search-results">
            <ul class="label-list">
              <li>
                <div class="green colorblindable" data-id="1">
                  <i class="check-icon sm-icon"></i>
                </div>
                <div class="label-background green"></div>
                <div class="label-background-overlay"></div>
                <i class="edit-icon icon not-implemented"></i>
              </li>
              <li>
                <div class="yellow colorblindable" data-id="2">
                  <i class="check-icon sm-icon"></i>
                </div>
                <div class="label-background yellow"></div>
                <div class="label-background-overlay"></div>
                <i class="edit-icon icon not-implemented"></i>
              </li>
              <li>
                <div class="orange colorblindable" data-id="3">
                  <i class="check-icon sm-icon"></i>
                </div>
                <div class="label-background orange"></div>
                <div class="label-background-overlay"></div>
                <i class="edit-icon icon not-implemented"></i>
              </li>
              <li>
                <div class="red colorblindable" data-id="4">
                  <i class="check-icon sm-icon"></i>
                </div>
                <div class="label-background red"></div>
                <div class="label-background-overlay"></div>
                <i class="edit-icon icon not-implemented"></i>
              </li>
              <li>
                <div class="purple colorblindable" data-id="5">
                  <i class="check-icon sm-icon"></i>
                </div>
                <div class="label-background purple"></div>
                <div class="label-background-overlay"></div>
                <i class="edit-icon icon not-implemented"></i>
              </li>
              <li>
                <div class="blue colorblindable" data-id="6">
                  <i class="check-icon sm-icon"></i>
                </div>
                <div class="label-background blue"></div>
                <div class="label-background-overlay"></div>
                <i class="edit-icon icon not-implemented"></i>
              </li>
            </ul>
            <ul class="light-list">
              <li class="not-implemented">Create a new label</li>
              <hr />
              <li class="toggleColorblind">
                Enable color blind friendly mode.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabelsPopover;
