import { Classes, Icon } from "@blueprintjs/core";
import * as classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { UpdateFilter } from "../../store/locations/actions";
import { FilterState } from "../../store/locations/types";
import { RootState } from "../../store/RootState";

import "./FilterControls.less";
import { TagSelect } from "./TagSelect";

interface ConnectedProps {
  filter: FilterState;
}

interface DispatchProps {
  onFilterChange: (newFilter: FilterState) => void;
}

class FilterControls extends React.PureComponent<ConnectedProps & DispatchProps, never> {
  render() {
    return (
      <div className="sidebar-filter-controls">
        <div className="filter-control-group">
          <Icon icon="search" />
          <input
            className={classNames("search-term-input", Classes.INPUT, Classes.FILL)}
            type="search"
            placeholder="Search..."
            value={this.props.filter.searchTerm}
            onChange={this.onSearchTermChange}
          />
        </div>

        <div className="filter-control-group">
          <Icon icon="filter" />
          <TagSelect
            selectedTags={this.props.filter.tags}
            onSelect={this.onSelectTag}
            onDeselectAtIndex={this.onDeselectTag}
          />
        </div>
      </div>
    );
  }

  private onSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onFilterChange({ ...this.props.filter, searchTerm: event.target.value });
  }

  private onSelectTag = (selectedTag: string) => {
    if (!this.props.filter.tags.includes(selectedTag)) {
      this.props.onFilterChange({
        ...this.props.filter,
        tags: [...this.props.filter.tags, selectedTag],
      });
    }
  }

  private onDeselectTag = (tagIndex: number) => {
    const newTags = [...this.props.filter.tags];
    newTags.splice(tagIndex, 1);
    this.props.onFilterChange({
      ...this.props.filter,
      tags: newTags,
    });
  }
}

function mapStateToProps(state: RootState): ConnectedProps {
  return {
    filter: state.location.filter,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    onFilterChange: (newFilter: FilterState) => dispatch(UpdateFilter.create({ filter: newFilter })),
  };
}

export const ConnectedFilterControls: React.ComponentClass<{}>
  = connect(mapStateToProps, mapDispatchToProps)(FilterControls as any);
