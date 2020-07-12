import React, { useState, useEffect } from 'react';

const MARKETING_BASE_URL = process.env.MARKETING_BASE_URL;

function AuthorizationWall() {
  return (
    <div className="authorization-wall">
      <div className="container">
        <h1>You're not authorized to access the admin dashboard</h1>
        <p>
          If you've requested to create a network, please wait for our CEO to
          get back to you.
        </p>
        <p>
          Want to create a network?&nbsp;
          <a
            href={`${MARKETING_BASE_URL}/request-network`}
            className="link"
          >
            Request a space here.
          </a>
        </p>
        <p>
          Not a network administrator?&nbsp;
          <a
            className="link"
            href="https://apps.apple.com/us/app/declaration/id1079454028"
          >
            Download the app.
          </a>
        </p>
      </div>

      <style jsx>{`
        @import 'shared/styles/media.css';

        .authorization-wall {
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          min-height: 100%;
          width: 100%;
        }

        .container {
          padding-left: 20px;
          padding-right: 20px;
        }

        h1 {
          max-width: 30ch;
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 35px;
          text-align: center;
        }

        p {
          line-height: 1.5;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
}

export default AuthorizationWall;
