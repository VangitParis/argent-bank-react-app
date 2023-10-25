/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Link } from "react-router-dom";
import '../../styles/sass/pages/_errorStyles.scss';

export default function Error() {
  return (
    <main>
      <section className="error-content">
        <h1>Page Not Found</h1>
        <p>
          The Page you are looking for doesn't exist or an other error are
          occurred.
        </p>
        <p>Go back to</p>
        <Link to="/">
          <button>Home Page</button>
        </Link>
      </section>
    </main>
  );
}
