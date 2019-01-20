// @flow
import React from 'react';
import { Modal } from 'modal/modal';
import Button from 'component/button';
import UserEmailNew from 'component/userEmailNew';
import UserEmailVerify from 'component/userEmailVerify';

type Props = {
  completeFirstRun: () => void,
  email: string,
  user: ?{ has_verified_email: boolean },
};

class FirstRunEmailCollection extends React.PureComponent<Props> {
  render() {
    const { completeFirstRun, email, user } = this.props;

    // this shouldn't happen
    if (!user) {
      return null;
    }

    const cancelButton = <Button button="link" onClick={completeFirstRun} label={__('Not Now')} />;
    if (user && !user.has_verified_email && !email) {
      return <UserEmailNew cancelButton={cancelButton} />;
    } else if (user && !user.has_verified_email) {
      return <UserEmailVerify cancelButton={cancelButton} />;
    }

    return null;
  }
}

export default FirstRunEmailCollection;
