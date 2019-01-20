import React, { Fragment, PureComponent } from 'react';
import posed, { PoseGroup } from 'react-pose';
import Button from 'component/button';
import EmailCollection from 'component/emailCollection';
import Native from 'native';
import CategoryList from 'component/categoryList';

// const WelcomeWrapper = posed.div({
//   hide: { height: 0, flip: true },
//   show: { height: 250, flip: true },
// });

const animationConfig = {
  hide: { opacity: 0 },
  show: { opacity: 1 },
};

const spring = {
  type: 'spring',
  stiffness: 100,
  damping: 10,
  mass: 1,
};

const Welcome = posed.div({
  hide: { opacity: 0, y: '348px', ...spring },
  show: { opacity: 1, ...spring },
});

const Email = posed.div({
  hide: { opacity: 0, y: '0', ...spring },
  show: { opacity: 1, y: '-348px', ...spring, delay: 200 },
});

type Props = {
  isWelcomeAcknowledged: boolean,
  aknowledgeWelcome: () => void,
};

export default class FirstRun extends PureComponent<Props> {
  renderWelcome() {
    const { acknowledgeWelcome } = this.props;

    return (
      <Fragment>
        <div className="welcome">
          <header className="card__header">
            <h1 className="card__title">{__('Hi There')}</h1>
          </header>
          <div className="card__content">
            <p>
              {__('Using LBRY is like dating a centaur. Totally normal up top, and')}{' '}
              <em>{__('way different')}</em> {__('underneath.')}
            </p>
            <p>{__('Up top, LBRY is similar to popular media sites.')}</p>
            <p>
              {__(
                'Below, LBRY is controlled by users -- you -- via blockchain and decentralization.'
              )}
            </p>
            <div className="card__actions">
              <Button button="primary" onClick={acknowledgeWelcome} label={__("I'm In")} />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  render() {
    const {
      isWelcomeAcknowledged,
      isEmailCollectionAcknowledged,
      isFirstRunComplete,
      acknowledgeWelcome,
    } = this.props;
    // const { showWelcome, showEmail } = this.state;
    const showWelcome = !isWelcomeAcknowledged;
    const showEmail = !isEmailCollectionAcknowledged && isWelcomeAcknowledged;
    console.log('show email?', showEmail);
    // console.log('show welcome?', showWelcome);
    console.log('this.props?', this.props);

    if (isFirstRunComplete) {
      return null;
    }

    return (
      <div className="banner">
        {/* <gerbil static />
        <contentthatchanges static />
        <categoryList fill /> */}
        <img
          alt="Friendly gerbil"
          className="yrbl--first-run banner__item"
          src={Native.imagePath('gerbil-happy.png')}
        />

        {/* <div className=" banner__item--static-height">

        </div> */}

        <div className="banner__item">
          <div className="banner__item--static-height">
            <Welcome className="banner__content" pose={showWelcome ? 'show' : 'hide'}>
              {this.renderWelcome()}
            </Welcome>
          </div>
          <div className="banner__item--static-height">
            <Email pose={showEmail ? 'show' : 'hide'}>
              <EmailCollection />
            </Email>
          </div>
        </div>
        <div className="banner__item">
          <CategoryList
            category={__('More Info On LBRY')}
            names={[
              'lbry://lbry',
              'lbry://one',
              'lbry://two',
              'lbry://three',
              'lbry://four',
              'lbry://five',
              'lbry://six',
              'lbry://seven',
              'lbry://eight',
            ]}
          />
        </div>
      </div>
    );
  }
}
