import React from 'react';

import { Track } from 'typings/track';

import styles from './styles.module.scss';
import { TrackDetail } from './TrackDetail/index';

export type TracksProps = {
  title?: string;
  id?: number;
  trackDetails: Track[];
  className?: string;
};

export type TracksState = {
  expanded: boolean;
};

export class Tracks extends React.Component<TracksProps, TracksState> {
  state: TracksState = {
    expanded: false,
  };

  toggleExpansion = () => {
    this.setState((previousState) => ({
      expanded: !previousState.expanded,
    }));
  };

  render() {
    const {
      title = 'Follow a Structured Curriculum',
      trackDetails = [],
      id = 5,
    } = this.props;
    const tracksVisible = trackDetails && trackDetails.length > 0;
    

    return (
      <div className={styles.tracksContainer}>
        {tracksVisible && (
          <div>
            <div className={styles.tracksText}>
              <h2 className={styles.tracksTitle}>{title}</h2>
            </div>
            <div className={styles.tracksDetailLayout}>
              {trackDetails
                .slice(0, this.state.expanded ? Infinity : id)
                .map((trackDetail, index) => (
                  <TrackDetail
                    key={trackDetail.title}
                    id={index + 1}
                    {...trackDetail}
                  />
                ))}
              {trackDetails.length > id && (
                <button
                  className={styles.moreTracksDetailLayout}
                  onClick={this.toggleExpansion}
                  type="button"
                >
                  {this.state.expanded
                    ? 'See less'
                    : `+ ${trackDetails.length - id} more lessons`}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
