const mapContentPollOption = ({
  poll_option,
}) => ({
  uuid: poll_option.uuid,
  text: poll_option.text,
});

const mapContentPoll = ({
  uuid,
  content_partial_poll_options,
  content_partial_poll_votes = [], // NOTE: this assumes we're fetching votes for one person
  content_partial_poll_vote_counts = [],
}) => {
  if (!content_partial_poll_options || !uuid) {
    return null;
  }

  return {
    uuid,
    options: content_partial_poll_options.map(mapContentPollOption),
    vote: (
      content_partial_poll_votes.length > 0
        ? mapContentPollOption(content_partial_poll_votes[0])
        : null
    ),
    voteCounts: content_partial_poll_vote_counts.map(({ poll_option, count }) => ({
      count,
      option: mapContentPollOption({ poll_option }),
    })),
    voteCountsByOptionUuid: content_partial_poll_vote_counts.reduce((accumulator, { count, poll_option }) => {
      accumulator[poll_option.uuid] = count;
      return accumulator;
    }, {}),
    totalVoteCounts: content_partial_poll_vote_counts.reduce((accumulator, { count }) => accumulator + count, 0),
  }
};

export default mapContentPoll;
