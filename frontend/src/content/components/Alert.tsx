import React from 'react';

interface IProps {
  dismiss: () => void;
  addToWhiteList: () => void;
  warn: string;
}

const Alert: React.FC<IProps> = ({ dismiss, addToWhiteList, warn }) => {
  return (
    <div className="container-pd">
      <div className="container2-pd">
        <div className="card-pd">
          <div className="flex-center-pd">
            <div className="inner-pd">
              <svg
                className="svg-icon-pd"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" />
              </svg>
            </div>
            <h2 className="heading-pd">Phishing Site Detected!</h2>
            <p className="description-pd">{warn}</p>
          </div>
          <div className="actions-pd">
            <button onClick={addToWhiteList} className="secondaryBtn-pd">
              Add to WhiteList
            </button>
            <button onClick={dismiss} className="primaryBtn-pd">
              Visit the site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
