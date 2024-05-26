import React from "react";

function About() {
  return (
    <>
      <section className="container flex flex-col justify-center">
        <h1 className="text-sky-400 mb-20 text-center">
          Sectional Titles & Property Management
        </h1>
        <h2 className="text-3xl text-slate-400 text-center text-justify">
          <span className="font-bold text-sky-400">
            Sectional Title{" "}
          </span>
          describes the separate ownership of a unit within a group-owned
          complex or development. Simply put, the term refers to a complex with
          flats, townhouses or apartments that has multiple owners; each
          owning a section of the overall property. The collective of owners
          typically elect a body corporate made up of some of the owners to take
          responsibility for some of the tasks required to maintain the
          property. This includes overseeing the enforcement of rules and
          regulations, the security, upkeep and maintenance of the property, and
          managing communication with the owners, renters and related parties
          among other things.
        </h2>
      </section>
    </>
  );
}

export default About;
