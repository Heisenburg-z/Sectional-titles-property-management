import React from "react";

function About() {
  return (
    <>
      <section className="container flex flex-col justify-center">
        <h2 className="text-5xl font-bold mb-20 text-center">
          Sectional Titles & Property Management
        </h2>
        <p className="text-slate-800 font-mono text-center font-medium w-3/5 mx-auto">
          <span className="text-3xl font-bold text-sky-400">
            Sectional Title{" "}
          </span>
          describes the separate ownership of a unit within a group-owned
          complex or development. Simply put, the term refers to a complex with
          flats, townhouses or apartments that has{" "}
          <span className="text-sky-400 underline">multiple owners</span>; each
          owning a section of the overall property. The collective of owners
          typically elect a body corporate made up of some of the owners to take
          responsibility for some of the tasks required to maintain the
          property. This includes overseeing the enforcement of rules and
          regulations, the security, upkeep and maintenance of the property, and
          managing communication with the owners, renters and related parties
          among other things.
        </p>
      </section>
    </>
  );
}

export default About;
