import * as SETTINGS from 'constants/settings';
import { connect } from 'react-redux';
import { makeSelectClientSetting } from 'redux/selectors/settings';
import { doSetClientSetting } from 'redux/actions/settings';
import FirstRun from './view';

const select = state => ({
  isEmailCollectionAcknowledged: makeSelectClientSetting(SETTINGS.EMAIL_COLLECTION_ACKNOWLEDGED)(
    state
  ),
  isWelcomeAcknowledged: makeSelectClientSetting(SETTINGS.NEW_USER_ACKNOWLEDGED)(state),
  isFirstRunComplete: makeSelectClientSetting(SETTINGS.FIRST_RUN_COMPLETED)(state),
});

const perform = dispatch => ({
  acknowledgeWelcome: () => {
    dispatch(doSetClientSetting(SETTINGS.NEW_USER_ACKNOWLEDGED, true));
  },
});

export default connect(
  select,
  perform
)(FirstRun);
